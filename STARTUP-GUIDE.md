# 🚀 HPP Server - Startup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
JWT_SECRET=your_super_secret_key_here_change_in_production
PORT=3000
NODE_ENV=development
MAX_FILE_SIZE=10485760
UPLOADS_DIR=./uploads
```

### 3. Start Server
```bash
npm start
```

Server running at: **http://localhost:3000**

---

## 🧪 Testing

### Manual API Tests

#### 1. Health Check
```bash
curl http://localhost:3000/api/health
```

#### 2. Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123"}'
```

#### 3. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```
Save the token from response: `TOKEN=...`

#### 4. Verify Token
```bash
curl -X POST http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 5. Upload HTML File
```bash
curl -X POST http://localhost:3000/api/files/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@mypage.html"
```

#### 6. List User's Files
```bash
curl http://localhost:3000/api/files \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 7. View Uploaded File
```bash
curl http://localhost:3000/uploads/filename-123456.html
```

#### 8. Delete File
```bash
curl -X DELETE http://localhost:3000/api/files/FILE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 9. Browse Public Directory
```bash
curl http://localhost:3000/files
```

---

## 🌐 Web Interface

1. **Home**: http://localhost:3000/
2. **Login/Register**: http://localhost:3000/login.html
3. **Dashboard**: http://localhost:3000/dashboard.html
4. **Public Directory**: http://localhost:3000/files

---

## 📁 Folder Structure

```
src/
  ├── index.js         # Server (Express + all routes + file handling)
  └── db.js            # SQLite database

public/
  ├── index.html       # Home page
  ├── login.html       # Auth UI
  ├── dashboard.html   # User dashboard
  └── css/
      └── styles.css   # Styles

uploads/               # User-uploaded files (auto-created)

.env                   # Configuration (git-ignored)
package.json           # Dependencies
```

---

## 🔧 Troubleshooting

### Port 3000 in use
```bash
PORT=3001 npm start
```

### Database error
```bash
rm hpp.db
npm start
```

### File upload fails
- Check file is HTML format
- File size < 10MB
- Check JWT token is valid

### Can't create uploads directory
```bash
mkdir uploads
npm start
```

---

## 📦 Production Deployment

### Environment
```env
NODE_ENV=production
JWT_SECRET=generate_a_strong_secret_here
PORT=8080
```

### Using PM2
```bash
npm install -g pm2
pm2 start src/index.js --name "hpp-server"
pm2 save
pm2 startup
```

### Using Docker
```bash
docker-compose up -d
```

### Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📊 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/verify` | Verify token |

### Files
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/files/upload` | Upload file (auth) |
| GET | `/api/files` | List user files (auth) |
| DELETE | `/api/files/:fileId` | Delete file (auth) |
| GET | `/uploads/:filename` | Access file |
| GET | `/files` | Public directory |

### Server
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/` | Home page |

---

## 🔐 Security Checklist

✅ JWT authentication
✅ Password hashing (bcrypt)
✅ Input validation
✅ File type validation
✅ CORS enabled
✅ File size limits
✅ User file isolation
✅ Unique file naming

**For production:**
- [ ] Change JWT_SECRET to strong random value
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Set up backups
- [ ] Monitor logs

---

## 📞 Support

For issues:
1. Check server logs: `npm start` (see console output)
2. Check `.env` configuration
3. Verify database: `ls hpp.db`
4. Test endpoints with curl

Happy hosting! 🎉
