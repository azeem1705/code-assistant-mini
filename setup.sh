#!/bin/bash

# Traycer MVP - Quick Start Script
# This script helps you get the application running quickly

echo "🚀 Traycer MVP - Quick Start Script"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16+) first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
echo "✅ Node.js version: $NODE_VERSION"

# Check if pnpm is available, otherwise use npm
if command -v pnpm &> /dev/null; then
    PKG_MANAGER="pnpm"
    echo "✅ Using pnpm package manager"
else
    PKG_MANAGER="npm"
    echo "✅ Using npm package manager"
fi

echo ""
echo "📦 Installing dependencies..."

# Install API dependencies
echo "🔧 Installing API dependencies..."
cd api
if [ -f package.json ]; then
    npm install
    echo "✅ API dependencies installed"
else
    echo "❌ API package.json not found"
    exit 1
fi

# Install UI dependencies
echo "🎨 Installing UI dependencies..."
cd ../ui
if [ -f package.json ]; then
    $PKG_MANAGER install
    echo "✅ UI dependencies installed"
else
    echo "❌ UI package.json not found"
    exit 1
fi

cd ..

echo ""
echo "⚙️  Environment Setup"
echo "===================="

# Check for API .env file
if [ ! -f api/.env ]; then
    echo "📄 Creating API .env file..."
    cat > api/.env << EOF
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/traycer-mvp

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
EOF
    echo "✅ Created api/.env - Please update MONGODB_URI if needed"
else
    echo "✅ API .env file exists"
fi

# Check for UI .env.local file
if [ ! -f ui/.env.local ]; then
    echo "📄 Creating UI .env.local file..."
    cat > ui/.env.local << EOF
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Traycer MVP
EOF
    echo "✅ Created ui/.env.local"
else
    echo "✅ UI .env.local file exists"
fi

echo ""
echo "🗄️  Database Setup"
echo "================="

# Check if MongoDB is running
if command -v mongod &> /dev/null; then
    if pgrep mongod > /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is installed but not running"
        echo "   Start it with: mongod --dbpath /path/to/your/database"
        echo "   Or use MongoDB Atlas: https://www.mongodb.com/atlas"
    fi
else
    echo "⚠️  MongoDB not found locally"
    echo "   Install MongoDB Community Server or use MongoDB Atlas"
    echo "   Local: https://www.mongodb.com/try/download/community"
    echo "   Cloud: https://www.mongodb.com/atlas"
fi

echo ""
echo "🎯 Quick Commands"
echo "================"
echo "To start development servers:"
echo ""
echo "Terminal 1 (API):"
echo "  cd api && npm run dev"
echo ""
echo "Terminal 2 (UI):"
echo "  cd ui && $PKG_MANAGER dev"
echo ""
echo "Or use the start script:"
echo "  ./start-dev.sh"
echo ""
echo "Application URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:3001"
echo ""
echo "📚 For detailed instructions, see:"
echo "  - README.md (overview)"
echo "  - DEVELOPMENT.md (detailed setup)"
echo "  - api/README.md (backend specific)"
echo "  - ui/README.md (frontend specific)"
echo ""
echo "🎉 Setup complete! Run the commands above to start developing."