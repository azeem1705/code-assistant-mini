# Traycer MVP - Quick Start Script (PowerShell)
# This script helps you get the application running quickly on Windows

Write-Host "🚀 Traycer MVP - Quick Start Script" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js (v16+) first." -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if pnpm is available, otherwise use npm
try {
    $pnpmVersion = pnpm --version
    $pkgManager = "pnpm"
    Write-Host "✅ Using pnpm package manager (version: $pnpmVersion)" -ForegroundColor Green
} catch {
    $pkgManager = "npm"
    Write-Host "✅ Using npm package manager" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan

# Install API dependencies
Write-Host "🔧 Installing API dependencies..." -ForegroundColor Yellow
Set-Location api
if (Test-Path package.json) {
    npm install
    Write-Host "✅ API dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ API package.json not found" -ForegroundColor Red
    exit 1
}

# Install UI dependencies
Write-Host "🎨 Installing UI dependencies..." -ForegroundColor Yellow
Set-Location ../ui
if (Test-Path package.json) {
    if ($pkgManager -eq "pnpm") {
        pnpm install
    } else {
        npm install
    }
    Write-Host "✅ UI dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ UI package.json not found" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "⚙️  Environment Setup" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan

# Check for API .env file
if (-not (Test-Path api/.env)) {
    Write-Host "📄 Creating API .env file..." -ForegroundColor Yellow
    $apiEnvContent = @"
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/traycer-mvp

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
"@
    $apiEnvContent | Out-File -FilePath api/.env -Encoding UTF8
    Write-Host "✅ Created api/.env - Please update MONGODB_URI if needed" -ForegroundColor Green
} else {
    Write-Host "✅ API .env file exists" -ForegroundColor Green
}

# Check for UI .env.local file
if (-not (Test-Path ui/.env.local)) {
    Write-Host "📄 Creating UI .env.local file..." -ForegroundColor Yellow
    $uiEnvContent = @"
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Traycer MVP
"@
    $uiEnvContent | Out-File -FilePath ui/.env.local -Encoding UTF8
    Write-Host "✅ Created ui/.env.local" -ForegroundColor Green
} else {
    Write-Host "✅ UI .env.local file exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "🗄️  Database Setup" -ForegroundColor Cyan
Write-Host "=================" -ForegroundColor Cyan

# Check if MongoDB is running (Windows)
$mongoProcess = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB is not running or not installed" -ForegroundColor Yellow
    Write-Host "   Option 1: Install MongoDB Community Server" -ForegroundColor Yellow
    Write-Host "            https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
    Write-Host "   Option 2: Use MongoDB Atlas (cloud)" -ForegroundColor Yellow
    Write-Host "            https://www.mongodb.com/atlas" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 Quick Commands" -ForegroundColor Cyan
Write-Host "=================" -ForegroundColor Cyan
Write-Host "To start development servers:" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 1 (API):" -ForegroundColor Yellow
Write-Host "  cd api" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 (UI):" -ForegroundColor Yellow
Write-Host "  cd ui" -ForegroundColor White
if ($pkgManager -eq "pnpm") {
    Write-Host "  pnpm dev" -ForegroundColor White
} else {
    Write-Host "  npm run dev" -ForegroundColor White
}
Write-Host ""
Write-Host "Or use the start script:" -ForegroundColor Yellow
Write-Host "  ./start-dev.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Application URLs:" -ForegroundColor Yellow
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:  http://localhost:3001" -ForegroundColor White
Write-Host ""
Write-Host "📚 For detailed instructions, see:" -ForegroundColor Cyan
Write-Host "  - README.md (overview)" -ForegroundColor White
Write-Host "  - DEVELOPMENT.md (detailed setup)" -ForegroundColor White
Write-Host "  - api/README.md (backend specific)" -ForegroundColor White
Write-Host "  - ui/README.md (frontend specific)" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Setup complete! Run the commands above to start developing." -ForegroundColor Green