@echo off
REM HPP Cleanup Script - Remove all old files using git

echo Cleaning up old files using git...
echo.

REM Remove old HTML files
for %%f in (*.html) do (
    if "%%f"=="index.html" if exist "public\index.html" (
        git rm -f "%%f" 2>nul
    ) else if not "%%f"=="index.html" (
        git rm -f "%%f" 2>nul
    )
)

REM Remove old CSS files
for %%f in (*.css) do git rm -f "%%f" 2>nul

REM Remove old TS/JS files at root
git rm -f app.ts 2>nul
git rm -f request.ts 2>nul
git rm -f index.js 2>nul
git rm -f inject-script.js 2>nul
git rm -f basic.js 2>nul
git rm -f login.js 2>nul
git rm -f login32.js 2>nul
git rm -f register.js 2>nul
git rm -f ESLINT.js 2>nul
git rm -f gulpfile.js 2>nul

REM Remove old image files
for %%f in (*.png *.jpg *.jpeg *.gif *.webp *.svg) do git rm -f "%%f" 2>nul

REM Remove old config files
git rm -f *.php 2>nul
git rm -f *.rs 2>nul
git rm -f cleanup.bat 2>nul
git rm -f tsconfig.json 2>nul
git rm -f changelog.md 2>nul
git rm -f beta-policy.md 2>nul
git rm -f Redirector-main.rs 2>nul
git rm -f searchers-2.1.rs 2>nul

REM Remove old directories
git rm -rf Redirector 2>nul
git rm -rf URI-protocol 2>nul
git rm -rf weatherAPI 2>nul
git rm -rf JS 2>nul
git rm -rf batch 2>nul

echo.
echo ✓ Old files removed from git staging
echo.
echo Next step: Review changes with 'git status'
echo Then commit with: git commit -m "Clean up old files - HPP rebuild"
echo.
pause
