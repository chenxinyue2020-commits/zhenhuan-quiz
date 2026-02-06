# Fix Git PATH in Cursor's Integrated Terminal
# Run this script in Cursor's terminal to refresh PATH

Write-Host "Fixing Git PATH in Cursor Terminal..." -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

# Check if Git exists
$gitPath = "C:\Program Files\Git\cmd\git.exe"
if (-not (Test-Path $gitPath)) {
    Write-Host "✗ Git not found at: $gitPath" -ForegroundColor Red
    Write-Host "Please verify Git installation." -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Git found at: $gitPath" -ForegroundColor Green
Write-Host ""

# Check current PATH
Write-Host "Current PATH status:" -ForegroundColor Yellow
$gitInPath = $env:PATH -split ';' | Where-Object { $_ -like "*Git*" }
if ($gitInPath) {
    Write-Host "✓ Git is in PATH:" -ForegroundColor Green
    $gitInPath | ForEach-Object { Write-Host "  $_" -ForegroundColor White }
} else {
    Write-Host "✗ Git is NOT in PATH for this terminal session" -ForegroundColor Red
    Write-Host ""
    Write-Host "Adding Git to PATH for this session..." -ForegroundColor Yellow
    
    # Add Git to PATH
    $gitCmdPath = "C:\Program Files\Git\cmd"
    if ($env:PATH -notlike "*$gitCmdPath*") {
        $env:PATH += ";$gitCmdPath"
        Write-Host "✓ Added Git to PATH" -ForegroundColor Green
    }
}

Write-Host ""

# Test Git
Write-Host "Testing git command..." -ForegroundColor Yellow
try {
    $version = git --version 2>&1
    if ($version -match "git version") {
        Write-Host "✓ SUCCESS! Git is now working in Cursor terminal!" -ForegroundColor Green
        Write-Host "  $version" -ForegroundColor White
        Write-Host ""
        Write-Host "You can now use git commands in this terminal." -ForegroundColor Green
    } else {
        Write-Host "⚠ Git command still not working. Trying full path..." -ForegroundColor Yellow
        $fullPathVersion = & "$gitPath" --version
        Write-Host "Full path works: $fullPathVersion" -ForegroundColor White
        Write-Host ""
        Write-Host "PATH may need to be refreshed. Try:" -ForegroundColor Yellow
        Write-Host "  1. Close and reopen Cursor's terminal (Ctrl+`)" -ForegroundColor White
        Write-Host "  2. Or restart Cursor completely" -ForegroundColor White
    }
} catch {
    Write-Host "✗ Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "IMPORTANT NOTES:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Why this happens:" -ForegroundColor White
Write-Host "  - Cursor's terminal was opened BEFORE Git was installed" -ForegroundColor Gray
Write-Host "  - The PATH environment variable is loaded when terminal starts" -ForegroundColor Gray
Write-Host "  - This script fixes it for THIS terminal session only" -ForegroundColor Gray
Write-Host ""
Write-Host "Permanent solutions:" -ForegroundColor White
Write-Host "  1. Close Cursor's terminal: Press Ctrl+` (backtick) to toggle terminal" -ForegroundColor Gray
Write-Host "  2. Open a new terminal: View → Terminal (or Ctrl+`)" -ForegroundColor Gray
Write-Host "  3. Or restart Cursor completely" -ForegroundColor Gray
Write-Host ""
Write-Host "After restarting terminal, git should work automatically!" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Cyan
