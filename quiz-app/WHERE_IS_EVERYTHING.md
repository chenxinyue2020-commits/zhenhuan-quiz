# Where Is Everything? - File Location Guide

This guide shows you exactly WHERE each file/folder is located.

---

## Your Project Structure

```
d:\cursor tutorial\
│
├── images\                          ← ORIGINAL images folder (source)
│   ├── zhenhuan.png
│   ├── huanghou_yixiu.png
│   └── ... (all 13 character images)
│
└── quiz-app\                        ← YOUR NEW APP (destination)
    │
    ├── .env.local                   ← CREATE THIS FILE (Step 6)
    │                                 (Copy from .env.local.example)
    │
    ├── .env.local.example           ← TEMPLATE (already exists)
    │
    ├── package.json                 ← Project config (already exists)
    │
    ├── instant.schema.ts            ← Database schema (already exists)
    │
    ├── instant.permissions.ts       ← Permissions (already exists)
    │
    ├── node_modules\                ← Created after "npm install" (Step 3)
    │                                 (Don't edit - auto-generated)
    │
    ├── public\                      ← Static files folder
    │   └── images\                  ← COPY images folder HERE (Step 9)
    │       ├── zhenhuan.png
    │       ├── huanghou_yixiu.png
    │       └── ... (all 13 images)
    │
    ├── app\                         ← Next.js pages (already exists)
    │   ├── layout.tsx
    │   ├── page.tsx                 ← Home page
    │   ├── quiz\
    │   │   └── page.tsx             ← Quiz page
    │   ├── leaderboard\
    │   │   └── page.tsx             ← Leaderboard page
    │   └── profile\
    │       └── page.tsx             ← Profile page
    │
    ├── components\                  ← React components (already exists)
    │   ├── Auth\
    │   │   ├── SignIn.tsx
    │   │   └── SignOut.tsx
    │   ├── Quiz\
    │   │   ├── QuizContainer.tsx
    │   │   ├── QuestionBlock.tsx
    │   │   └── ProgressBar.tsx
    │   └── Leaderboard\
    │       └── LeaderboardTable.tsx
    │
    └── lib\                         ← Utility files (already exists)
        ├── db.ts                    ← Database connection
        ├── quiz-data.ts             ← Quiz questions
        └── utils.ts                 ← Helper functions
```

---

## Where to Run Commands

**ALL commands should be run from:**
```
d:\cursor tutorial\quiz-app
```

**How to get there:**
```powershell
cd "d:\cursor tutorial\quiz-app"
```

**Verify you're in the right place:**
```powershell
# Should show: d:\cursor tutorial\quiz-app
pwd

# OR in PowerShell:
Get-Location
```

---

## Where to Edit Files

### 1. Environment Variables
**File:** `d:\cursor tutorial\quiz-app\.env.local`
**Editor:** Notepad, VS Code, or any text editor
**What to edit:** Replace `your_app_id_here` with your Instant DB App ID

### 2. Quiz Questions (Optional - for customization)
**File:** `d:\cursor tutorial\quiz-app\lib\quiz-data.ts`
**Editor:** VS Code or any code editor
**What's there:** All 30 quiz questions

### 3. Styling (Optional - for customization)
**File:** `d:\cursor tutorial\quiz-app\app\globals.css`
**Editor:** VS Code or any code editor
**What's there:** Global CSS styles

---

## Where to Find Things

### Instant DB App ID
**Location:** Instant DB Dashboard (in browser)
**URL:** https://instantdb.com
**Steps:**
1. Log in
2. Click on your app
3. Look for "App ID" or "Application ID"
4. Copy it

### Terminal/Command Prompt
**Location:** 
- **Windows:** Search "PowerShell" or "Command Prompt" in Start menu
- **VS Code:** Press `` Ctrl+` `` (backtick) to open integrated terminal
- **Cursor:** Same as VS Code

### Browser
**Location:** Any web browser (Chrome, Edge, Firefox)
**URL to open:** http://localhost:3000 (after starting dev server)

---

## File Copy Locations

### Copy Images Folder
**FROM:** `d:\cursor tutorial\images`
**TO:** `d:\cursor tutorial\quiz-app\public\images`

**Visual Guide:**
```
Source:  d:\cursor tutorial\images\
         └── [all image files]

Destination: d:\cursor tutorial\quiz-app\public\images\
              └── [paste images here]
```

**How to copy:**
1. Open File Explorer
2. Navigate to: `d:\cursor tutorial\images`
3. Right-click on `images` folder → Copy
4. Navigate to: `d:\cursor tutorial\quiz-app\public`
5. Right-click → Paste

---

## Important File Locations Summary

| What | Where |
|------|-------|
| Run commands | `d:\cursor tutorial\quiz-app` (in terminal) |
| Edit App ID | `d:\cursor tutorial\quiz-app\.env.local` |
| Copy images FROM | `d:\cursor tutorial\images` |
| Copy images TO | `d:\cursor tutorial\quiz-app\public\images` |
| View app | http://localhost:3000 (in browser) |
| Instant DB dashboard | https://instantdb.com (in browser) |

---

## Common Mistakes

### ❌ Wrong Directory
**Problem:** Running commands from `d:\cursor tutorial` instead of `d:\cursor tutorial\quiz-app`
**Solution:** Always `cd` into `quiz-app` first

### ❌ Wrong Images Location
**Problem:** Images in `quiz-app\images` instead of `quiz-app\public\images`
**Solution:** Images MUST be in `public\images\` folder

### ❌ Missing .env.local
**Problem:** Only `.env.local.example` exists, not `.env.local`
**Solution:** Copy `.env.local.example` and rename to `.env.local`, then edit it

### ❌ Wrong App ID Format
**Problem:** `.env.local` still contains `your_app_id_here`
**Solution:** Replace with actual App ID from Instant DB dashboard

---

## Quick Navigation Commands

```powershell
# Go to project root
cd "d:\cursor tutorial\quiz-app"

# Go to images source
cd "d:\cursor tutorial\images"

# Go to images destination
cd "d:\cursor tutorial\quiz-app\public\images"

# Open current folder in File Explorer (Windows)
explorer .

# Open .env.local in Notepad
notepad .env.local
```

---

## Verification Commands

```powershell
# Check current directory
pwd

# List files in current directory
dir

# Check if .env.local exists
Test-Path .env.local

# Check if images folder exists
Test-Path public\images

# Check Node.js version
node --version

# Check npm version
npm --version
```
