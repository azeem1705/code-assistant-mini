# API - Backend Server

Express.js TypeScript API server for the Traycer MVP application.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm package manager
- MongoDB (local or cloud instance)

### Installation
```bash
# Navigate to the API directory
cd api

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env  # Edit with your configuration
```

### Environment Setup
Create a `.env` file in the `api/` directory:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/traycer

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:3000
```

### Running the Server

#### Development Mode (with hot reload)
```bash
npm run dev
```

#### Production Build
```bash
# Build the TypeScript code
npm run build

# Start the production server
npm start
```

#### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests (if configured)

## 📡 API Endpoints

### Base URL
- Development: `http://localhost:3001`
- Production: Your deployed server URL

### Planner Routes
```http
GET    /api/plans              # Get all plans
POST   /api/plans              # Create a new plan
GET    /api/plans/:id          # Get a specific plan
PUT    /api/plans/:id          # Update a plan
DELETE /api/plans/:id          # Delete a plan
```

### Request/Response Examples

#### Create a Plan
```http
POST /api/plans
Content-Type: application/json

{
  "title": "My New Plan",
  "description": "Plan description",
  "steps": ["Step 1", "Step 2", "Step 3"]
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "64f5c8a123456789abcdef01",
    "title": "My New Plan",
    "description": "Plan description",
    "steps": ["Step 1", "Step 2", "Step 3"],
    "createdAt": "2023-10-05T10:30:00.000Z",
    "updatedAt": "2023-10-05T10:30:00.000Z"
  }
}
```

## 🏗️ Project Structure

```
api/
├── src/
│   ├── index.ts                    # Application entry point
│   ├── models/
│   │   ├── dto/
│   │   │   └── planInput.ts        # Data Transfer Objects
│   │   └── schemas/                # Database schemas
│   ├── repositories/
│   │   └── plannerRepository.ts    # Data access layer
│   ├── routers/
│   │   ├── index.ts                # Main router
│   │   └── plannerRouter.ts        # Planner-specific routes
│   ├── services/
│   │   └── plannerService.ts       # Business logic
│   └── utils/
│       ├── errorHandleMiddle.ts    # Error handling middleware
│       ├── errors.ts               # Custom error classes
│       └── response.ts             # Response utilities
├── dist/                           # Compiled JavaScript (after build)
├── node_modules/                   # Dependencies
├── .env                           # Environment variables (create this)
├── .gitignore                     # Git ignore rules
├── eslint.config.mjs              # ESLint configuration
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Dependency lock file
└── tsconfig.json                  # TypeScript configuration
```

## 🛠️ Development

### Adding New Routes
1. Create route handler in `src/routers/`
2. Add business logic in `src/services/`
3. Add data access logic in `src/repositories/`
4. Register route in `src/routers/index.ts`

### Error Handling
The API uses centralized error handling:
- Custom error classes in `src/utils/errors.ts`
- Error middleware in `src/utils/errorHandleMiddle.ts`
- Standardized response format in `src/utils/response.ts`

### Database Integration
- Repository pattern for data access
- Add new models in `src/models/schemas/`
- Add DTOs in `src/models/dto/`

## 🔧 Configuration

### TypeScript Configuration
The `tsconfig.json` includes:
- ES2020 target
- Node.js module resolution
- Strict type checking
- Path mapping for clean imports

### ESLint Configuration
Configured for:
- TypeScript support
- Node.js environment
- Express.js best practices

## 🚦 Testing
```bash
# Run tests (when configured)
npm test

# Run tests in watch mode
npm run test:watch

# Run test coverage
npm run test:coverage
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 3001
   npx kill-port 3001
   # Or change PORT in .env file
   ```

2. **MongoDB connection failed**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify network connectivity

3. **TypeScript compilation errors**
   ```bash
   # Clear dist folder and rebuild
   rm -rf dist
   npm run build
   ```

4. **Module not found errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Debug Mode
Run the server with debug logs:
```bash
DEBUG=* npm run dev
```

## 📝 API Documentation
- Use tools like Postman or Insomnia to test endpoints
- Consider adding Swagger/OpenAPI documentation
- API base URL: `http://localhost:3001/api`

## 🔐 Security Considerations
- Add authentication middleware
- Implement rate limiting
- Use HTTPS in production
- Validate input data
- Sanitize database queries