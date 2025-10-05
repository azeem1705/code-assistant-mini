# Traycer MVP - MERN Stack Application

A full-stack MERN (MongoDB, Express.js, React, Node.js) application with a modern tech stack including TypeScript, Next.js, and Tailwind CSS.

## 🚀 Tech Stack

### Backend (API)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - Database (assumed)

### Frontend (UI)
- **Next.js** - React framework
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Component library
- **Zustand** - State management

## 📁 Project Structure

```
traycer-mvp/
├── api/                    # Backend Express.js API
│   ├── src/
│   │   ├── models/         # Data models and DTOs
│   │   ├── repositories/   # Data access layer
│   │   ├── routers/        # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── package.json
├── ui/                     # Frontend Next.js application
│   ├── app/               # Next.js app router
│   ├── components/        # React components
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility libraries
│   ├── store/             # Zustand state management
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **pnpm** package manager
- **MongoDB** (local or cloud instance)

### 1. Clone the Repository
```bash
git clone https://github.com/azeem1705/code-assistant-mini.git
cd traycer-mvp
```

### 2. Setup Backend (API)
```bash
cd api
npm install
# Copy environment variables
cp .env.example .env  # Edit with your MongoDB connection string
npm run dev
```
The API will run on `http://localhost:3001` (or configured port)

### 3. Setup Frontend (UI)
```bash
cd ../ui
npm install
# or if you prefer pnpm
pnpm install

npm run dev
# or
pnpm dev
```
The UI will run on `http://localhost:3000`

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🔧 Development

### Running in Development Mode
1. **Start the API server** (in `api/` directory):
   ```bash
   npm run dev
   ```

2. **Start the UI development server** (in `ui/` directory):
   ```bash
   npm run dev
   ```

Both servers support hot reloading for development.

### Building for Production
1. **Build the API** (in `api/` directory):
   ```bash
   npm run build
   npm start
   ```

2. **Build the UI** (in `ui/` directory):
   ```bash
   npm run build
   npm start
   ```

## 📝 Environment Variables

### API (.env)
Create a `.env` file in the `api/` directory:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/traycer
NODE_ENV=development
```

### UI
Environment variables for the UI should be prefixed with `NEXT_PUBLIC_` for client-side access.

## 🔗 API Endpoints

The API provides endpoints for the planner functionality:
- `GET /api/plans` - Get all plans
- `POST /api/plans` - Create a new plan
- `PUT /api/plans/:id` - Update a plan
- `DELETE /api/plans/:id` - Delete a plan

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in your `.env` file or kill the process using the port

2. **MongoDB connection issues**
   - Ensure MongoDB is running
   - Check your connection string in `.env`

3. **Module not found errors**
   - Run `npm install` in both `api/` and `ui/` directories
   - Clear node_modules and reinstall if needed

### Getting Help
- Check the individual README files in `api/` and `ui/` folders
- Review the DEVELOPMENT.md file for detailed setup instructions
- Open an issue on GitHub for bugs or questions

---

## 📚 Additional Documentation

- [API Documentation](./api/README.md)
- [UI Documentation](./ui/README.md)
- [Development Guide](./DEVELOPMENT.md)