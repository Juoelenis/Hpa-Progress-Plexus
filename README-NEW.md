# 🌐 HPP – HTML File Hosting Server

**HPP Server** is a lightweight, user-friendly platform for hosting HTML files. Users can create accounts, upload their HTML files, and access them via unique URLs. Perfect for personal projects, testing, and sharing web content.

> **📖 Quick Links:**
> - [🚀 Startup Guide](./STARTUP-GUIDE.md) - Get server running in 3 steps
> - [📝 Cleanup List](./FILES-TO-DELETE.md) - What was removed
> - [🧪 API Endpoints](./STARTUP-GUIDE.md#-api-reference) - Full API reference

---

## ✨ Features

- 👤 **User Authentication**: JWT-based login/registration system
- 📤 **File Upload**: Web UI and REST API for uploading HTML files
- 🔗 **Unique URLs**: Each file gets a unique shareable link
- 📁 **File Listing**: Public directory showing all hosted files
- 🔐 **Secure**: Password hashing, input validation, token-based auth
- ⚡ **Lightweight**: Minimal dependencies, fast startup
- 🎯 **Simple Stack**: Express.js + SQLite + Vanilla JS

---

## 📁 Project Structure

```
hpp/
├── src/
│   ├── index.js           # Main server with all routes (auth + files)
│   └── db.js              # SQLite database setup and operations
├── public/
│   ├── index.html         # Home page
│   ├── login.html         # Login/Register page
│   ├── dashboard.html     # User dashboard
│   └── css/
│       └── styles.css     # Shared styles
├── uploads/               # User-uploaded HTML files (created at runtime)
├── package.json           # Dependencies
├── .env.example           # Configuration template
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v14+)
- npm

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web server
- `sqlite3` - Database
- `jsonwebtoken` - JWT auth
- `bcryptjs` - Password hashing
- `multer` - File uploads
- `express-validator` - Input validation
- `dotenv` - Environment variables

### 3. Setup Environment

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env`:
```env
JWT_SECRET=your_secure_secret_key_here
PORT=3000
NODE_ENV=development
MAX_FILE_SIZE=10485760
```

### 4. Start the Server

```bash
npm start
```

The server will be available at `http://localhost:3000`

---

## 📖 Usage

### Web Interface

1. **Home Page**: `http://localhost:3000/`
2. **Login/Register**: `http://localhost:3000/login.html`
3. **Dashboard**: `http://localhost:3000/dashboard.html` (requires login)
4. **Browse Files**: `http://localhost:3000/files` (public directory)

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account
- `POST /api/auth/verify` - Verify JWT token

#### File Management
- `POST /api/files/upload` - Upload HTML file (requires auth)
- `GET /api/files` - List user's files (requires auth)
- `DELETE /api/files/:fileId` - Delete file (requires auth)
- `GET /uploads/:filename` - Access uploaded file

#### Health
- `GET /api/health` - Server status

### Example: Upload File via API

```bash
curl -X POST http://localhost:3000/api/files/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@mypage.html"
```

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ bcryptjs password hashing
- ✅ Input validation via express-validator
- ✅ File type validation (HTML only)
- ✅ File size limits (10MB default)
- ✅ CORS enabled for safe cross-origin requests
- ✅ Unique file naming with timestamps

---

## 🛠️ Development

### Run in Development Mode

```bash
npm run dev
```

### Database

SQLite database is automatically created at `hpp.db` with two tables:
- **users**: username, email, password_hash, timestamps
- **files**: user_id, filename, original_name, file_size, mime_type, timestamps

---

## 📦 Deployment

### Docker

Use the provided `docker-compose.yml`:

```bash
docker-compose up
```

### Manual Deployment

1. Set `NODE_ENV=production` in `.env`
2. Set a strong `JWT_SECRET`
3. Configure your domain/port
4. Run `npm install` and `npm start`
5. Use a reverse proxy (nginx) and SSL certificate

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **GPL 3.0 License**. See `LICENSE` for details.

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
PORT=3001 npm start
```

**Database locked?**
Delete `hpp.db` and restart the server.

**Files not uploading?**
- Check file size (max 10MB)
- Ensure file is HTML format
- Verify authentication token is valid

---

**Enjoy hosting your HTML files! 🚀**
