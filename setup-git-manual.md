# Manual Git Setup Instructions

Since PowerShell script execution is disabled, follow these manual steps:

## Step 1: Open PowerShell
Open a standalone PowerShell window (not Cursor's terminal)

## Step 2: Navigate to project
```powershell
cd "d:\cursor tutorial"
```

## Step 3: Initialize Git
```powershell
git init
```

## Step 4: Configure Git (if not already configured globally)
```powershell
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Step 5: Add all files
```powershell
git add .
```

## Step 6: Create initial commit
```powershell
git commit -m "Initial commit: Add word game and quiz projects"
```

## Step 7: Verify
```powershell
git status
```

Done! Your git repository is now set up.
