# Start Development Servers - PowerShell Script
# This script starts both the API and UI development servers

param(
    [switch]$API,
    [switch]$UI,
    [switch]$Help
)

if ($Help) {
    Write-Host "Traycer MVP Development Starter" -ForegroundColor Green
    Write-Host "Usage:"
    Write-Host "  ./start-dev.ps1        # Start both API and UI servers"
    Write-Host "  ./start-dev.ps1 -API   # Start only API server"
    Write-Host "  ./start-dev.ps1 -UI    # Start only UI server"
    Write-Host "  ./start-dev.ps1 -Help  # Show this help"
    exit 0
}

Write-Host "🚀 Starting Traycer MVP Development Servers" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green

# Function to start API server
function Start-API {
    Write-Host "🔧 Starting API Server..." -ForegroundColor Yellow
    Write-Host "Location: api/" -ForegroundColor Gray
    Write-Host "URL: http://localhost:3001" -ForegroundColor Gray
    
    if (Test-Path "api/package.json") {
        Start-Process -FilePath "cmd" -ArgumentList "/k", "cd api && npm run dev" -WindowStyle Normal
        Write-Host "✅ API server starting in new window" -ForegroundColor Green
    } else {
        Write-Host "❌ API directory not found or package.json missing" -ForegroundColor Red
        return $false
    }
    return $true
}

# Function to start UI server
function Start-UI {
    Write-Host "🎨 Starting UI Server..." -ForegroundColor Yellow
    Write-Host "Location: ui/" -ForegroundColor Gray
    Write-Host "URL: http://localhost:3000" -ForegroundColor Gray
    
    if (Test-Path "ui/package.json") {
        # Check if pnpm is available
        try {
            pnpm --version | Out-Null
            Start-Process -FilePath "cmd" -ArgumentList "/k", "cd ui && pnpm dev" -WindowStyle Normal
            Write-Host "✅ UI server starting in new window (using pnpm)" -ForegroundColor Green
        } catch {
            Start-Process -FilePath "cmd" -ArgumentList "/k", "cd ui && npm run dev" -WindowStyle Normal
            Write-Host "✅ UI server starting in new window (using npm)" -ForegroundColor Green
        }
    } else {
        Write-Host "❌ UI directory not found or package.json missing" -ForegroundColor Red
        return $false
    }
    return $true
}

# Start servers based on parameters
if ($API -and -not $UI) {
    Start-API
} elseif ($UI -and -not $API) {
    Start-UI
} else {
    # Start both (default behavior)
    $apiStarted = Start-API
    Start-Sleep -Seconds 2  # Small delay between starts
    $uiStarted = Start-UI
    
    if ($apiStarted -and $uiStarted) {
        Write-Host ""
        Write-Host "🎉 Both servers are starting!" -ForegroundColor Green
        Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "🔧 Backend:  http://localhost:3001" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "💡 Tip: Check the new terminal windows for server logs" -ForegroundColor Yellow
        Write-Host "🛑 To stop servers: Press Ctrl+C in each terminal window" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "📚 Need help? Check these files:" -ForegroundColor Cyan
Write-Host "  - README.md" -ForegroundColor Gray
Write-Host "  - DEVELOPMENT.md" -ForegroundColor Gray
Write-Host "  - api/README.md" -ForegroundColor Gray
Write-Host "  - ui/README.md" -ForegroundColor Gray