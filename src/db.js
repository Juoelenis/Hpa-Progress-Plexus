require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '../hpp.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('✓ SQLite database connected');
});

// Initialize database schema
function initialize() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Files table
    db.run(`
      CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        filename TEXT NOT NULL,
        file_path TEXT NOT NULL,
        original_name TEXT,
        file_size INTEGER,
        mime_type TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('✓ Database schema initialized');
  });
}

// User operations
const User = {
  create: (username, email, password, callback) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return callback(err);
      db.run(
        `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`,
        [username, email, hash],
        function(err) {
          callback(err, this.lastID);
        }
      );
    });
  },

  findByUsername: (username, callback) => {
    db.get(
      `SELECT * FROM users WHERE username = ?`,
      [username],
      callback
    );
  },

  findById: (id, callback) => {
    db.get(
      `SELECT id, username, email, created_at FROM users WHERE id = ?`,
      [id],
      callback
    );
  }
};

// File operations
const File = {
  create: (userId, fileData, callback) => {
    const { filename, file_path, original_name, file_size, mime_type } = fileData;
    db.run(
      `INSERT INTO files (user_id, filename, file_path, original_name, file_size, mime_type) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, filename, file_path, original_name, file_size, mime_type],
      function(err) {
        callback(err, this.lastID);
      }
    );
  },

  findByUserId: (userId, callback) => {
    db.all(
      `SELECT * FROM files WHERE user_id = ? ORDER BY created_at DESC`,
      [userId],
      callback
    );
  },

  findById: (fileId, callback) => {
    db.get(
      `SELECT * FROM files WHERE id = ?`,
      [fileId],
      callback
    );
  },

  delete: (fileId, userId, callback) => {
    db.run(
      `DELETE FROM files WHERE id = ? AND user_id = ?`,
      [fileId, userId],
      callback
    );
  }
};

module.exports = {
  db,
  initialize,
  User,
  File
};
