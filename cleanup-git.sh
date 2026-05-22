#!/bin/bash
# HPP Cleanup Script - Remove all old files

# Files/folders to KEEP
KEEP=(
  ".git"
  ".github"
  ".env"
  ".env.example"
  ".gitignore"
  "src"
  "public"
  "uploads"
  "docker"
  "docker-compose.yml"
  "package.json"
  "package-lock.json"
  "README.md"
  "README-NEW.md"
  "LICENSE"
  "LIECENSE"
  "CODE_OF_CONDUCT.md"
  "CONTRIBUTING.md"
  "SECURITY.md"
  "node_modules"
  ".git"
)

# Old files/folders to DELETE (everything else)
echo "Removing old files..."

# Remove old HTML files
git rm -f *.html 2>/dev/null || true
git rm -f *.htm 2>/dev/null || true

# Remove old CSS files
git rm -f *.css 2>/dev/null || true

# Remove old TypeScript/JS files (keep package.json, gulpfile.js if needed)
git rm -f *.ts 2>/dev/null || true
git rm -f app.js index.js request.ts 2>/dev/null || true

# Remove images
git rm -f *.png *.jpg *.jpeg *.gif *.webp *.svg 2>/dev/null || true

# Remove other config files
git rm -f *.php *.rs *.bat 2>/dev/null || true
git rm -f tsconfig.json gulpfile.js ESLINT.js inject-script.js 2>/dev/null || true
git rm -f changelog.md beta-policy.md 2>/dev/null || true

# Remove old directories
git rm -rf Redirector 2>/dev/null || true
git rm -rf URI-protocol 2>/dev/null || true
git rm -rf weatherAPI 2>/dev/null || true
git rm -rf JS 2>/dev/null || true
git rm -rf batch 2>/dev/null || true

echo "✓ Old files removed from git"
echo "Commit these changes with: git commit -m 'Clean up old files - HPP rebuild'"
