# Cursor Tutorial Project

A collection of web games and interactive projects.

## Projects

- **Missing Letters Word Game** (`game.py`, `index.html`) - A word puzzle game
- **Zhenghuan Quiz** (`zhenghuan.html`) - Character recognition quiz game

## Setup

### Python Game
```bash
python game.py
```

### Web Version
Open `index.html` in your browser.

## Git Setup

To initialize git for this project:

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Or use: `winget install Git.Git`

2. **Initialize Git Repository**:
   ```powershell
   cd "d:\cursor tutorial"
   git init
   ```

3. **Configure Git** (first time only):
   ```powershell
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

4. **Add Files and Make Initial Commit**:
   ```powershell
   git add .
   git commit -m "Initial commit"
   ```

5. **Optional: Connect to Remote Repository**:
   ```powershell
   git remote add origin <your-repository-url>
   git branch -M main
   git push -u origin main
   ```

## File Structure

```
.
├── game.py              # Python version of word game
├── index.html           # Web version of word game
├── script.js            # JavaScript for web game
├── style.css            # Styles for web game
├── zhenghuan.html       # Character quiz game
├── images/              # Character images
└── poem.txt             # Text file

```
