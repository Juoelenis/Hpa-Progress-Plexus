@echo off
REM Cleanup script for HPP restructure

cd /d "%~dp0"

echo Removing old src directory...
if exist src rmdir /s /q src

echo Removing old public directory...
if exist public rmdir /s /q public

echo Removing node_modules...
if exist node_modules rmdir /s /q node_modules

echo Removing package-lock.json...
if exist package-lock.json del /q package-lock.json

echo Creating new directory structure...
if not exist src mkdir src
if not exist src\routes mkdir src\routes
if not exist src\middleware mkdir src\middleware
if not exist src\config mkdir src\config
if not exist public mkdir public
if not exist public\css mkdir public\css
if not exist public\js mkdir public\js
if not exist uploads mkdir uploads

echo ✓ Directory structure created!
echo.
echo Remaining cleanup: Please manually verify old files are gone
dir /b | findstr /v "^src $" | findstr /v "^public $" | findstr /v "^uploads $"
