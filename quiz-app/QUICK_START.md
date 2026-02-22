# Quick Start - Copy & Paste Commands

Copy and paste these commands **one at a time** into PowerShell/Command Prompt.

## Prerequisites Check

```powershell
# Check if Node.js is installed
node --version
```

If you see an error, install Node.js from https://nodejs.org/ first.

---

## Setup Commands (Run in Order)

### 1. Navigate to project folder
```powershell
cd "d:\cursor tutorial\quiz-app"
```

### 2. Install dependencies
```powershell
npm install
```

### 3. Login to Instant DB (will open browser)
```powershell
npx instant-cli login
```

### 4. Push database schema
```powershell
npx instant-cli push
```

### 5. Start development server
```powershell
npm run dev
```

---

## Manual Steps (Cannot be automated)

### A. Create Instant DB Account
1. Go to: https://instantdb.com
2. Sign up with email
3. Create a new app
4. Copy the App ID

### B. Create .env.local file
1. In File Explorer, go to: `d:\cursor tutorial\quiz-app`
2. Copy `.env.local.example` and rename to `.env.local`
3. Open `.env.local` in Notepad
4. Replace `your_app_id_here` with your actual App ID
5. Save file

### C. Copy Images
1. Copy folder: `d:\cursor tutorial\images`
2. Paste to: `d:\cursor tutorial\quiz-app\public\images`

---

## Open App

After running `npm run dev`, open browser to:
```
http://localhost:3000
```

---

## Full Detailed Instructions

See `STEP_BY_STEP_SETUP.md` for complete detailed instructions with explanations.
