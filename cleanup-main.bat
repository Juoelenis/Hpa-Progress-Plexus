@echo off
REM Clean up main branch - Remove old HPP files

echo.
echo ==========================================
echo   Cleaning GitHub Main Branch
echo ==========================================
echo.

cd /d "%~dp0"

REM Check we're on main
git branch -v

echo.
echo Removing old files...
echo.

REM Remove old HTML files
git rm -f *.html 2>nul
git rm -f *.htm 2>nul

REM Remove old CSS
git rm -f *.css 2>nul

REM Remove old TS/JS (keep package.json)
git rm -f app.ts request.ts inject-script.js basic.js login.js login32.js register.js ESLINT.js gulpfile.js 2>nul

REM Remove images
for %%f in (*.png *.jpg *.jpeg *.gif *.webp *.svg) do git rm -f "%%f" 2>nul

REM Remove other files
git rm -f *.php *.rs *.bat tsconfig.json changelog.md beta-policy.md 2>nul

REM Remove directories
git rm -rf Redirector URI-protocol weatherAPI JS batch 2>nul

echo.
echo ==========================================
echo   Deleted files summary:
echo ==========================================
echo.

git status

echo.
echo Next steps:
echo   1. Review: git status
echo   2. Commit: git commit -m "Clean up main branch - remove old HPP files"
echo   3. Push: git push origin main
echo.
pause
