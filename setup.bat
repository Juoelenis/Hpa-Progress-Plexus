@echo off
echo.
echo ============================================
echo   HPP Server - Installation & Test
echo ============================================
echo.

cd /d "%~dp0"

echo [1/3] Installing dependencies...
call npm install

if errorlevel 1 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo [2/3] Checking installation...
call npm list --depth=0

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo Next steps:
echo   1. Copy environment file: copy .env.example .env
echo   2. Edit .env with your settings
echo   3. Start server: npm start
echo.
echo Server will be available at: http://localhost:3000
echo.
pause
