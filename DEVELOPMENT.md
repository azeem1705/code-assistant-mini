# Development Guide

Complete development setup and workflow guide for the Traycer MVP MERN stack application.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Database Configuration](#database-configuration)
- [Running the Application](#running-the-application)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🛠️ Prerequisites

### Required Software
- **Node.js** (v16.0.0 or higher)
  ```bash
  # Check version
  node --version
  npm --version
  ```

- **MongoDB** (v4.4 or higher)
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community)
  - OR [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud database)

- **Git** (latest version)
  ```bash
  git --version
  ```

### Recommended Tools
- **pnpm** - Faster package manager
  ```bash
  npm install -g pnpm
  ```
- **MongoDB Compass** - GUI for MongoDB
- **Postman** or **Insomnia** - API testing
- **VS Code** with extensions:
  - ES7+ React/Redux/React-Native snippets
  - TypeScript Importer
  - Tailwind CSS IntelliSense
  - MongoDB for VS Code

## ⚙️ Environment Setup

### 1. Clone and Initial Setup
```bash
# Clone the repository
git clone https://github.com/azeem1705/code-assistant-mini.git
cd traycer-mvp

# Install dependencies for both frontend and backend
cd api && npm install
cd ../ui && pnpm install  # or npm install
cd ..
```

### 2. Environment Variables

#### Backend Environment (api/.env)
Create `api/.env` file:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/traycer-mvp
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/traycer-mvp

# Security
JWT_SECRET=your-super-secret-jwt-key-here
BCRYPT_ROUNDS=12

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# API Rate Limiting
RATE_LIMIT_WINDOW=15  # minutes
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FORMAT=dev
```

#### Frontend Environment (ui/.env.local)
Create `ui/.env.local` file:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_TIMEOUT=10000

# Application Configuration
NEXT_PUBLIC_APP_NAME=Traycer MVP
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=development

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=true

# Theme Configuration
NEXT_PUBLIC_DEFAULT_THEME=light
```

### 3. Environment Template Files
Create template files for easy setup:

#### api/.env.example
```bash
cp api/.env api/.env.example
# Edit .env.example to remove sensitive values
```

## 🗄️ Database Configuration

### Option 1: Local MongoDB
```bash
# Install MongoDB Community Server
# Start MongoDB service
mongod --dbpath /path/to/your/database

# Or using Homebrew (macOS)
brew services start mongodb-community

# Or using systemctl (Linux)
sudo systemctl start mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Add to `MONGODB_URI` in `.env`

### Database Initialization
```bash
# Connect to MongoDB and create database
mongo
use traycer-mvp

# Create initial collections (optional)
db.createCollection("plans")
db.createCollection("users")
```

## 🚀 Running the Application

### Development Mode (Recommended)

#### Option 1: Run Both Services Simultaneously
```bash
# Terminal 1 - Backend API
cd api
npm run dev

# Terminal 2 - Frontend UI
cd ui
pnpm dev  # or npm run dev
```

#### Option 2: Using Concurrently (if configured)
```bash
# From root directory (if package.json configured)
npm run dev  # Runs both API and UI
```

#### Option 3: Using Process Manager
```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'traycer-api',
      cwd: './api',
      script: 'npm',
      args: 'run dev',
      env: { NODE_ENV: 'development' }
    },
    {
      name: 'traycer-ui',
      cwd: './ui',
      script: 'pnpm',
      args: 'dev'
    }
  ]
}
EOF

# Start both services
pm2 start ecosystem.config.js
pm2 logs  # View logs
pm2 stop all  # Stop all services
```

### Production Mode
```bash
# Build both applications
cd api && npm run build
cd ../ui && pnpm build

# Start production servers
cd api && npm start
cd ../ui && pnpm start
```

### Service URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs (if configured)

## 🔄 Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes in either /api or /ui directories
# Test locally

# Commit changes
git add .
git commit -m "feat: add new feature description"

# Push and create PR
git push origin feature/your-feature-name
```

### 2. Code Quality

#### Linting and Formatting
```bash
# Backend (API)
cd api
npm run lint         # Check for lint errors
npm run lint:fix     # Auto-fix lint errors
npm run format       # Format code (if configured)

# Frontend (UI)
cd ui
pnpm lint           # Check for lint errors
pnpm lint:fix       # Auto-fix lint errors
```

#### Type Checking
```bash
# Backend
cd api && npx tsc --noEmit

# Frontend
cd ui && npx tsc --noEmit
```

### 3. Database Management

#### Migrations (if using a migration system)
```bash
# Example with a migration tool
cd api
npm run migrate:up    # Run migrations
npm run migrate:down  # Rollback migrations
```

#### Data Seeding
```bash
# Seed development data
cd api
npm run seed         # Run seed scripts (if configured)
```

## 🧪 Testing

### Unit Testing
```bash
# Backend tests
cd api
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Frontend tests
cd ui
pnpm test            # Run component tests
pnpm test:e2e        # Run end-to-end tests (if configured)
```

### API Testing
```bash
# Using curl
curl -X POST http://localhost:3001/api/plans \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Plan","description":"Test Description"}'

# Using Postman
# Import API collection from /docs/postman-collection.json (if available)
```

### Integration Testing
```bash
# Start test database
export NODE_ENV=test
export MONGODB_URI=mongodb://localhost:27017/traycer-mvp-test

# Run integration tests
cd api
npm run test:integration
```

## 📦 Building and Deployment

### Docker Setup
```dockerfile
# Create Dockerfile for API
FROM node:18-alpine
WORKDIR /app
COPY api/package*.json ./
RUN npm ci --only=production
COPY api/dist ./dist
EXPOSE 3001
CMD ["npm", "start"]
```

```dockerfile
# Create Dockerfile for UI
FROM node:18-alpine
WORKDIR /app
COPY ui/package*.json ./
RUN npm ci --only=production
COPY ui/.next ./.next
COPY ui/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  mongodb:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
  
  api:
    build:
      context: .
      dockerfile: api/Dockerfile
    ports:
      - "3001:3001"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/traycer-mvp
    depends_on:
      - mongodb
  
  ui:
    build:
      context: .
      dockerfile: ui/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://api:3001
    depends_on:
      - api

volumes:
  mongo_data:
```

### Deployment Commands
```bash
# Build and run with Docker
docker-compose up -d

# Deploy to cloud platforms
# Vercel (UI)
cd ui && vercel

# Railway/Render (API)
# Push to main branch with configured deployment
```

## 🐛 Troubleshooting

### Common Development Issues

#### 1. Port Already in Use
```bash
# Kill process using port 3001
npx kill-port 3001
# or
lsof -ti:3001 | xargs kill -9

# Kill process using port 3000
npx kill-port 3000
```

#### 2. MongoDB Connection Issues
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB (macOS with Homebrew)
brew services start mongodb-community

# Start MongoDB (Linux systemd)
sudo systemctl start mongod

# Check MongoDB logs
tail -f /var/log/mongodb/mongod.log
```

#### 3. Node.js Version Issues
```bash
# Using nvm to manage Node versions
nvm install 18
nvm use 18
nvm alias default 18
```

#### 4. Package Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Clear pnpm cache
pnpm store prune

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For pnpm
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### 5. Build Issues
```bash
# Backend build issues
cd api
rm -rf dist node_modules
npm install
npm run build

# Frontend build issues
cd ui
rm -rf .next node_modules
pnpm install
pnpm build
```

#### 6. CORS Issues
Check `api/.env`:
```env
CORS_ORIGIN=http://localhost:3000
```

Verify CORS middleware in `api/src/index.ts`

#### 7. Environment Variables Not Loading
```bash
# Restart development servers after changing .env files
# Ensure .env files are in correct directories
# Check for typos in variable names
```

### Debug Mode

#### Backend Debug
```bash
cd api
DEBUG=* npm run dev
```

#### Frontend Debug
```bash
cd ui
DEBUG=* pnpm dev
```

### Performance Monitoring
```bash
# Monitor API performance
cd api
npm run dev  # Check terminal output for request times

# Monitor frontend performance
# Use browser DevTools Performance tab
# Check Next.js build output for bundle sizes
```

## 📚 Additional Resources

### Documentation
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools and Extensions
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Postman](https://www.postman.com/)
- [VS Code Extensions for MERN](https://marketplace.visualstudio.com/)

### Community
- [Stack Overflow - MERN](https://stackoverflow.com/questions/tagged/mern)
- [GitHub Discussions](https://github.com/azeem1705/code-assistant-mini/discussions)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the development workflow
4. Write tests for new features
5. Submit a pull request

For more detailed contribution guidelines, see `CONTRIBUTING.md`.