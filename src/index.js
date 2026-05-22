require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Initialize database
db.initialize();

// Auth routes (inline for now until directory structure works)
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { User } = require('./db');

const authRouter = express.Router();

authRouter.post(
  '/register',
  [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    User.create(username, email, password, (err, userId) => {
      if (err) {
        return res.status(400).json({ error: err.message || 'Registration failed' });
      }

      const token = jwt.sign(
        { userId, username },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({ userId, token, username });
    });
  }
);

authRouter.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    User.findByUsername(username, (err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign(
          { userId: user.id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );

        res.json({ userId: user.id, token, username: user.username });
      });
    });
  }
);

authRouter.post('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    User.findById(decoded.userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'User not found' });
      }

      res.json({ userId: user.id, username: user.username });
    });
  });
});

// Middleware for protected routes
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  });
}

// File routes
const multer = require('multer');
const { File } = require('./db');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    cb(null, `${name}-${timestamp}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/html') {
      cb(null, true);
    } else {
      cb(new Error('Only HTML files are allowed'));
    }
  }
});

const fileRouter = express.Router();

fileRouter.post('/upload', verifyToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileData = {
    filename: req.file.filename,
    file_path: req.file.path,
    original_name: req.file.originalname,
    file_size: req.file.size,
    mime_type: req.file.mimetype
  };

  File.create(req.userId, fileData, (err, fileId) => {
    if (err) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ error: 'Failed to save file metadata' });
    }

    res.json({
      fileId,
      filename: req.file.filename,
      original_name: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      size: req.file.size
    });
  });
});

fileRouter.get('/', verifyToken, (req, res) => {
  File.findByUserId(req.userId, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch files' });
    }

    res.json(files || []);
  });
});

fileRouter.delete('/:fileId', verifyToken, (req, res) => {
  File.findById(req.params.fileId, (err, file) => {
    if (err || !file) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (file.user_id !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    File.delete(req.params.fileId, req.userId, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete file' });
      }

      fs.unlink(file.file_path, (err) => {
        if (err) console.error('Error deleting physical file:', err);
      });

      res.json({ message: 'File deleted successfully' });
    });
  });
});

// Mount routes
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

// Serve uploaded HTML files
app.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename);
  res.sendFile(filePath, (err) => {
    if (err) res.status(404).json({ error: 'File not found' });
  });
});

// File listing page (public)
app.get('/files', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading files');
    }

    const htmlFiles = files.filter(f => f.endsWith('.html'));
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>HPP - Hosted HTML Files</title>
        <link rel="stylesheet" href="/css/styles.css">
      </head>
      <body>
        <div class="container">
          <h1>📁 Hosted HTML Files</h1>
          <div class="files-list">
            ${htmlFiles.map(f => `<a href="/uploads/${f}" class="file-link">${f}</a>`).join('')}
          </div>
          <p><a href="/dashboard.html">← Back to Dashboard</a></p>
        </div>
      </body>
      </html>
    `;
    res.send(html);
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'HPP Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HPP Server running on http://localhost:${PORT}`);
});

module.exports = app;
