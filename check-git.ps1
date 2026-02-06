# Git Installation Checker
# Run this script to verify if Git is installed

Write-Host "Checking Git installation..." -ForegroundColor Cyan
Write-Host ""

# Method 1: Check version
Write-Host "Method 1: Checking git --version" -ForegroundColor Yellow
try {
    $version = git --version 2>&1
    if ($LASTEXITCODE -eq 0 -or $version -match "git version") {
        Write-Host "✓ Git is installed!" -ForegroundColor Green
        Write-Host "  Version: $version" -ForegroundColor White
        $gitInstalled = $true
    } else {
        throw "Git not found"
    }
} catch {
    Write-Host "✗ Git is NOT installed" -ForegroundColor Red
    $gitInstalled = $false
}

Write-Host ""

# Method 2: Check if git.exe exists
Write-Host "Method 2: Checking common installation paths" -ForegroundColor Yellow
$gitPaths = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
)

$foundPath = $null
foreach ($path in $gitPaths) {
    if (Test-Path $path) {
        Write-Host "✓ Found Git at: $path" -ForegroundColor Green
        $foundPath = $path
        break
    }
}

if (-not $foundPath) {
    Write-Host "✗ Git executable not found in common locations" -ForegroundColor Red
}

Write-Host ""

# Method 3: Check PATH environment variable
Write-Host "Method 3: Checking if Git is in PATH" -ForegroundColor Yellow
$gitInPath = $false
$pathDirs = $env:PATH -split ';'
foreach ($dir in $pathDirs) {
    if (Test-Path (Join-Path $dir "git.exe")) {
        Write-Host "✓ Git found in PATH: $dir" -ForegroundColor Green
        $gitInPath = $true
        break
    }
}

if (-not $gitInPath) {
    Write-Host "✗ Git is not in your PATH environment variable" -ForegroundColor Red
}

Write-Host ""

# Summary
Write-Host "=" * 50 -ForegroundColor Cyan
if ($gitInstalled) {
    Write-Host "RESULT: Git is installed and working! ✓" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Configure your identity:" -ForegroundColor White
    Write-Host "     git config --global user.name `"Your Name`"" -ForegroundColor Gray
    Write-Host "     git config --global user.email `"your.email@example.com`"" -ForegroundColor Gray
    Write-Host "  2. Run the setup script: .\setup-git.ps1" -ForegroundColor White
} else {
    Write-Host "RESULT: Git is NOT installed ✗" -ForegroundColor Red
    Write-Host ""
    Write-Host "To install Git:" -ForegroundColor Yellow
    Write-Host "  1. Download from: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "  2. Or run: winget install Git.Git" -ForegroundColor White
    Write-Host "  3. Restart your terminal after installation" -ForegroundColor White
}
Write-Host "=" * 50 -ForegroundColor Cyan
