# HPP Server - User Journey & Features

## 👥 User Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                   New User Journey                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Visit http://localhost:3000                             │
│     ↓                                                        │
│     🏠 Homepage with "Get Started" button                    │
│                                                              │
│  2. Click "Get Started"                                     │
│     ↓                                                        │
│     📝 Login/Register page                                  │
│     ├─ Toggle to Register form                              │
│     ├─ Enter: username, email, password                     │
│     └─ Click "Register"                                     │
│                                                              │
│  3. Account created! Auto-redirect                          │
│     ↓                                                        │
│     📊 Dashboard loaded with welcome message                │
│                                                              │
│  4. Upload first HTML file                                  │
│     ├─ Click "Choose File" or drag & drop                   │
│     ├─ Select .html file from computer                      │
│     └─ File uploads & appears in list                       │
│                                                              │
│  5. Share your file                                         │
│     ├─ Click "View" to open in new tab                      │
│     └─ Share URL: /uploads/mypage-1234567.html              │
│                                                              │
│  6. Manage files                                            │
│     ├─ See all uploaded files in dashboard                  │
│     ├─ File info: name, size, date                          │
│     ├─ Click "View" to preview                              │
│     └─ Click "Delete" to remove                             │
│                                                              │
│  7. Browse public directory                                 │
│     └─ Click "Browse Files" to see all hosted files         │
│                                                              │
│  8. Logout when done                                        │
│     └─ Click "Logout" button                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 UI Pages

### 1. Home Page (/)
```
┌──────────────────────────────────┐
│   🌐 HPP Server                  │
│   Lightweight HTML File Hosting  │
│                                  │
│   [Get Started →] [Browse Files] │
└──────────────────────────────────┘
```

### 2. Login/Register Page (/login.html)
```
┌──────────────────────────────────┐
│   🌐 HPP Server                  │
│   HTML File Hosting Platform     │
│                                  │
│   ☐ Login  ☑ Register           │
│                                  │
│   Username: [_____________]      │
│   Email:    [_____________]      │
│   Password: [_____________]      │
│                                  │
│   [Register] or [Sign in]        │
│                                  │
│   Have an account? [Login]       │
└──────────────────────────────────┘
```

### 3. Dashboard (/dashboard.html)
```
┌────────────────────────────────────────┐
│  🌐 HPP Server           👤 User [Exit]│
├────────────────────────────────────────┤
│                                        │
│  📤 Upload HTML File                   │
│  ┌─────────────────────────────────┐   │
│  │  [Choose File]   or drag & drop │   │
│  └─────────────────────────────────┘   │
│                                        │
│  📁 Your Uploaded Files                │
│  ┌──────────┬────────┬────────┬──────┐ │
│  │ File     │ Size   │ Date   │ Act  │ │
│  ├──────────┼────────┼────────┼──────┤ │
│  │ page1.h  │ 45 KB  │ 5/21   │[View] │ │
│  │ page2.h  │ 32 KB  │ 5/20   │[Del]  │ │
│  └──────────┴────────┴────────┴──────┘ │
│                                        │
│  🔗 Browse All Files                   │
│  [View Public Directory →]             │
│                                        │
└────────────────────────────────────────┘
```

### 4. Public Directory (/files)
```
┌──────────────────────────────────┐
│   📁 Hosted HTML Files           │
│                                  │
│   📄 page1-1234567.html          │
│   📄 page2-1234568.html          │
│   📄 resume-1234569.html         │
│                                  │
│   [← Back to Dashboard]          │
└──────────────────────────────────┘
```

## 🔄 Data Flow

```
User Input → Express Route → Validation → Database → Response
   ↓            ↓              ↓             ↓         ↓
Register    /api/auth/    Input Check   Users TBL   JWT Token
            register
            
Login       /api/auth/    Password      Check User  JWT Token
            login         Hash Match    
            
Upload      /api/files/   HTML Valid    File + Meta  File URL
            upload        Size Check    
            
List        /api/files    Auth Check    Query DB    File Array
            
Delete      /api/files/   Owner Check   Delete Row  Success Msg
            :id           Delete File   Delete Meta
```

## 🔐 Security Features

```
Registration:
  Input → Validate → Hash Password → Store → Token
           (express-validator)  (bcryptjs)

Login:
  Input → Find User → Compare Hash → Generate JWT → Return Token
          (database)  (bcryptjs)    (7-day expiry)

Protected Routes:
  Request → Check Header → Verify JWT → Check User → Allow/Deny
            (Authorization)  (jsonwebtoken)
```

## 📊 Database Schema

```
Users Table:
┌────────────┬──────────┬──────────┬────────────────┐
│ id         │ username │ email    │ password_hash  │
├────────────┼──────────┼──────────┼────────────────┤
│ 1 (PK)     │ alice    │ a@ex.com │ $2b$10$xxxxxx │
│ 2 (PK)     │ bob      │ b@ex.com │ $2b$10$yyyyyy │
└────────────┴──────────┴──────────┴────────────────┘

Files Table:
┌────┬─────────┬──────────────────────┬────────┐
│ id │ user_id │ filename             │ size   │
├────┼─────────┼──────────────────────┼────────┤
│ 1  │ 1       │ mypage-1234567.html  │ 45000 │
│ 2  │ 1       │ other-1234568.html   │ 32000 │
│ 3  │ 2       │ resume-1234569.html  │ 15000 │
└────┴─────────┴──────────────────────┴────────┘
```

## 🎯 Feature Matrix

| Feature | Status | Details |
|---------|--------|---------|
| User Registration | ✅ | Create account with email |
| User Login | ✅ | Authenticate with JWT |
| Password Security | ✅ | bcrypt hashing (10 rounds) |
| File Upload | ✅ | HTML files only, <10MB |
| File Storage | ✅ | Unique naming with timestamps |
| File Access | ✅ | Public URLs, user isolation |
| File Listing | ✅ | Dashboard + public directory |
| File Deletion | ✅ | User can delete own files |
| Responsive UI | ✅ | Mobile & desktop friendly |
| Error Handling | ✅ | Graceful errors |
| Input Validation | ✅ | express-validator |
| CORS | ✅ | Cross-origin safe |

## 🚀 Ready to Deploy!

```bash
npm install          # Install dependencies
cp .env.example .env # Configure
npm start            # Start server
# → http://localhost:3000 ✨
```

---

**Everything is built, tested, and documented!**
