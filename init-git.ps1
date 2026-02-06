# Initialize Git Repository
# Run this in your standalone PowerShell (where git works)

Write-Host "Initializing Git Repository" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host ""

# Check if git is available
try {
    $gitVersion = git --version 2>&1
    if ($gitVersion -match "git version") {
        Write-Host "✓ Git is available: $gitVersion" -ForegroundColor Green
    } else {
        throw "Git not found"
    }
} catch {
    Write-Host "✗ ERROR: Git is not available in this terminal" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "  1. Open a NEW standalone PowerShell window" -ForegroundColor White
    Write-Host "  2. Navigate to: d:\cursor tutorial" -ForegroundColor White
    Write-Host "  3. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Or manually run these commands:" -ForegroundColor Yellow
    Write-Host "  cd `"d:\cursor tutorial`"" -ForegroundColor Gray
    Write-Host "  git init" -ForegroundColor Gray
    Write-Host "  git add ." -ForegroundColor Gray
    Write-Host "  git commit -m `"Initial commit`"" -ForegroundColor Gray
    exit 1
}

# Check if already initialized
if (Test-Path ".git") {
    Write-Host "⚠ Git repository already initialized" -ForegroundColor Yellow
    $response = Read-Host "Do you want to continue anyway? (y/n)"
    if ($response -ne "y") {
        Write-Host "Aborted." -ForegroundColor Yellow
        exit 0
    }
} else {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Git repository initialized" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to initialize git repository" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# Check git config
Write-Host "Checking git configuration..." -ForegroundColor Yellow
$userName = git config user.name
$userEmail = git config user.email

if (-not $userName) {
    $userName = git config --global user.name
}
if (-not $userEmail) {
    $userEmail = git config --global user.email
}

if (-not $userName -or -not $userEmail) {
    Write-Host "⚠ Git user configuration not set" -ForegroundColor Yellow
    Write-Host ""
    $setConfig = Read-Host "Do you want to configure git now? (y/n)"
    if ($setConfig -eq "y") {
        if (-not $userName) {
            $name = Read-Host "Enter your name"
            git config user.name $name
        }
        if (-not $userEmail) {
            $email = Read-Host "Enter your email"
            git config user.email $email
        }
        Write-Host "✓ Git configured" -ForegroundColor Green
    } else {
        Write-Host "You can configure git later with:" -ForegroundColor Yellow
        Write-Host "  git config user.name `"Your Name`"" -ForegroundColor Gray
        Write-Host "  git config user.email `"your.email@example.com`"" -ForegroundColor Gray
    }
} else {
    Write-Host "✓ Git configured as: $userName <$userEmail>" -ForegroundColor Green
}

Write-Host ""

# Add files
Write-Host "Adding files to git..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Files added to staging area" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to add files" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Show status
Write-Host "Git status:" -ForegroundColor Yellow
git status --short

Write-Host ""

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
$commitMessage = "Initial commit: Add word game and quiz projects"
git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Initial commit created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=" * 50 -ForegroundColor Cyan
    Write-Host "Git setup complete! ✓" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your repository is now ready." -ForegroundColor White
    Write-Host ""
    Write-Host "Next steps (optional):" -ForegroundColor Cyan
    Write-Host "  1. Create a repository on GitHub/GitLab/Bitbucket" -ForegroundColor White
    Write-Host "  2. Connect your local repository:" -ForegroundColor White
    Write-Host "     git remote add origin <your-repository-url>" -ForegroundColor Gray
    Write-Host "  3. Push your code:" -ForegroundColor White
    Write-Host "     git branch -M main" -ForegroundColor Gray
    Write-Host "     git push -u origin main" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Useful commands:" -ForegroundColor Cyan
    Write-Host "  git status          - Check repository status" -ForegroundColor Gray
    Write-Host "  git log             - View commit history" -ForegroundColor Gray
    Write-Host "  git add <file>      - Stage a file" -ForegroundColor Gray
    Write-Host "  git commit -m `"msg`" - Commit changes" -ForegroundColor Gray
    Write-Host "=" * 50 -ForegroundColor Cyan
} else {
    Write-Host "⚠ Commit may have failed. Check the error above." -ForegroundColor Yellow
    Write-Host "You can try manually: git commit -m `"Initial commit`"" -ForegroundColor White
}
