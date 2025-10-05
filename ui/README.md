# UI - Frontend Application

Next.js React application with TypeScript, Tailwind CSS, and Shadcn/ui components for the Traycer MVP.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm package manager

### Installation
```bash
# Navigate to the UI directory
cd ui

# Install dependencies with npm
npm install

# OR install with pnpm (recommended)
pnpm install
```

### Running the Application

#### Development Mode
```bash
# With npm
npm run dev

# With pnpm
pnpm dev
```

The application will be available at `http://localhost:3000`

#### Production Build
```bash
# Build for production
npm run build
# or
pnpm build

# Start production server
npm start
# or
pnpm start
```

### Available Scripts
- `dev` - Start development server with hot reload
- `build` - Build the application for production
- `start` - Start the production server
- `lint` - Run ESLint
- `lint:fix` - Run ESLint and fix issues

## 🏗️ Project Structure

```
ui/
├── app/                           # Next.js App Router
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Home page
├── components/                    # React components
│   ├── input-box.tsx             # Input component
│   ├── plan-view.tsx             # Plan display component
│   ├── step-snippet.tsx          # Step component
│   ├── theme-provider.tsx        # Theme context provider
│   └── ui/                       # Shadcn/ui components
├── hooks/                         # Custom React hooks
├── lib/                          # Utility libraries
├── public/                       # Static assets
├── store/                        # State management (Zustand)
└── styles/                       # Additional styles
```

## Features
- **Task Input & Agent Toggle**: Switch between Planner and Normal agent modes
- **API Integration**: Connects to backend Express API at `http://localhost:3001`
- **Mock Fallback**: Graceful fallback with mock data when API is unavailable
- **Expandable Steps**: Smooth transitions for step-by-step plans
- **Download Feature**: Export project skeleton as ZIP file
- **Responsive Design**: Mobile-first responsive layout
- **Dark/Light Theme**: Toggle between themes

## 🎨 UI Components

### Shadcn/ui Components
This project uses [Shadcn/ui](https://ui.shadcn.com/) for consistent, accessible components:

#### Adding New Components
```bash
# Example: Add a new component
npx shadcn-ui@latest add calendar

# Add multiple components
npx shadcn-ui@latest add dropdown-menu menubar
```

### Custom Components
- `InputBox` - Task input with agent selection
- `PlanView` - Display component for generated plans
- `StepSnippet` - Individual step with code snippets
- `ThemeProvider` - Dark/light theme support

## 🔄 State Management

The application uses **Zustand** for lightweight state management:

```typescript
// Example usage in components
import { usePlanStore } from '@/store'

const MyComponent = () => {
  const { plans, addPlan, isLoading } = usePlanStore()
  return <div>{/* component JSX */}</div>
}
```

## 🔗 API Integration

### Backend Connection
The frontend connects to the Express.js API:

```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// API calls to backend
POST /api/plans - Create new plan
GET  /api/plans - Get all plans
```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Traycer MVP
```

## 🌙 Theme Support

Toggle between light and dark themes:
```typescript
import { useTheme } from 'next-themes'

const { theme, setTheme } = useTheme()
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Ensure backend is running on `http://localhost:3001`
   - Check CORS configuration
   - Verify API endpoints

2. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf .next node_modules pnpm-lock.yaml
   pnpm install
   ```

3. **Styling Issues**
   - Restart development server
   - Check Tailwind class names
   - Verify component imports

### Debug Mode
```bash
# Enable verbose logging
DEBUG=* npm run dev
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

## 📚 Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [Zustand State Management](https://zustand-demo.pmnd.rs/)
