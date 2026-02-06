# Git Setup Script for Cursor Tutorial Project
# Run this script in PowerShell to initialize git

Write-Host "Setting up Git for this project..." -ForegroundColor Green

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Or run: winget install Git.Git" -ForegroundColor Yellow
    exit 1
}

# Check if git is already initialized
if (Test-Path ".git") {
    Write-Host "Git repository already initialized." -ForegroundColor Yellow
    $response = Read-Host "Do you want to reinitialize? (y/n)"
    if ($response -ne "y") {
        Write-Host "Skipping initialization." -ForegroundColor Yellow
        exit 0
    }
}

# Initialize git repository
Write-Host "Initializing git repository..." -ForegroundColor Cyan
git init

# Check git config
Write-Host "`nChecking git configuration..." -ForegroundColor Cyan
$userName = git config --global user.name
$userEmail = git config --global user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "Git user configuration not set." -ForegroundColor Yellow
    Write-Host "Please configure your git identity:" -ForegroundColor Yellow
    Write-Host "  git config --global user.name `"Your Name`"" -ForegroundColor White
    Write-Host "  git config --global user.email `"your.email@example.com`"" -ForegroundColor White
    Write-Host "`nOr configure locally for this repository only:" -ForegroundColor Yellow
    Write-Host "  git config user.name `"Your Name`"" -ForegroundColor White
    Write-Host "  git config user.email `"your.email@example.com`"" -ForegroundColor White
} else {
    Write-Host "Git configured as: $userName <$userEmail>" -ForegroundColor Green
}

# Add all files
Write-Host "`nAdding files to git..." -ForegroundColor Cyan
git add .

# Show status
Write-Host "`nCurrent git status:" -ForegroundColor Cyan
git status

# Ask about initial commit
Write-Host "`nReady to make initial commit!" -ForegroundColor Green
$response = Read-Host "Do you want to create the initial commit now? (y/n)"
if ($response -eq "y") {
    git commit -m "Initial commit: Add word game and quiz projects"
    Write-Host "`nInitial commit created successfully!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "  1. Create a repository on GitHub/GitLab/etc." -ForegroundColor White
    Write-Host "  2. Run: git remote add origin <your-repo-url>" -ForegroundColor White
    Write-Host "  3. Run: git push -u origin main" -ForegroundColor White
} else {
    Write-Host "Skipping commit. Run 'git commit -m `"Initial commit`"' when ready." -ForegroundColor Yellow
}

Write-Host "`nGit setup complete!" -ForegroundColor Green
