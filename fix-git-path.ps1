# Fix Git PATH Issue
# This script helps refresh PATH or manually add Git to PATH

Write-Host "Git Installation Path Fixer" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host ""

# Check if Git exists
$gitPath = "C:\Program Files\Git\cmd\git.exe"
if (Test-Path $gitPath) {
    Write-Host "✓ Git is installed at: $gitPath" -ForegroundColor Green
} else {
    Write-Host "✗ Git not found at expected location" -ForegroundColor Red
    Write-Host "Please check your Git installation." -ForegroundColor Yellow
    exit 1
}

# Check current PATH
Write-Host "`nChecking current PATH..." -ForegroundColor Yellow
$gitInPath = $env:PATH -split ';' | Where-Object { $_ -like "*Git*" }
if ($gitInPath) {
    Write-Host "✓ Git is in PATH:" -ForegroundColor Green
    $gitInPath | ForEach-Object { Write-Host "  $_" -ForegroundColor White }
} else {
    Write-Host "✗ Git is NOT in PATH" -ForegroundColor Red
}

Write-Host ""

# Solution 1: Refresh PATH for current session
Write-Host "Solution 1: Refreshing PATH for current session..." -ForegroundColor Cyan
$gitCmdPath = "C:\Program Files\Git\cmd"
if ($env:PATH -notlike "*$gitCmdPath*") {
    $env:PATH += ";$gitCmdPath"
    Write-Host "✓ Added Git to PATH for this session" -ForegroundColor Green
} else {
    Write-Host "✓ Git already in PATH" -ForegroundColor Green
}

# Test if git works now
Write-Host "`nTesting git command..." -ForegroundColor Yellow
try {
    $version = & "$gitPath" --version 2>&1
    if ($version -match "git version") {
        Write-Host "✓ Git is now working!" -ForegroundColor Green
        Write-Host "  $version" -ForegroundColor White
        
        # Also test direct git command
        Write-Host "`nTesting 'git' command directly..." -ForegroundColor Yellow
        $directTest = git --version 2>&1
        if ($directTest -match "git version") {
            Write-Host "✓ 'git' command works directly!" -ForegroundColor Green
        } else {
            Write-Host "⚠ 'git' command still not working. You may need to restart your terminal." -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "✗ Git still not working: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host "IMPORTANT: If git still doesn't work, try these solutions:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Solution A: Restart your terminal/PowerShell" -ForegroundColor White
Write-Host "  - Close this terminal completely" -ForegroundColor Gray
Write-Host "  - Open a new PowerShell window" -ForegroundColor Gray
Write-Host "  - Run: git --version" -ForegroundColor Gray
Write-Host ""
Write-Host "Solution B: Manually add Git to PATH (permanent fix)" -ForegroundColor White
Write-Host "  1. Press Win + X, select 'System'" -ForegroundColor Gray
Write-Host "  2. Click 'Advanced system settings'" -ForegroundColor Gray
Write-Host "  3. Click 'Environment Variables'" -ForegroundColor Gray
Write-Host "  4. Under 'System variables', find 'Path' and click 'Edit'" -ForegroundColor Gray
Write-Host "  5. Click 'New' and add: C:\Program Files\Git\cmd" -ForegroundColor Gray
Write-Host "  6. Click OK on all windows" -ForegroundColor Gray
Write-Host "  7. Restart your terminal" -ForegroundColor Gray
Write-Host ""
Write-Host "Solution C: Use full path temporarily" -ForegroundColor White
Write-Host "  & 'C:\Program Files\Git\cmd\git.exe' --version" -ForegroundColor Gray
Write-Host "=" * 50 -ForegroundColor Cyan
