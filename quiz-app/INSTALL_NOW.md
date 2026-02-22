# Install Dependencies NOW - Step by Step

I can see `node_modules` is missing. Let's fix this right now.

---

## Step 1: Open Terminal

**WHERE:** 
- Open PowerShell OR Command Prompt
- Or use the terminal in Cursor (press `` Ctrl+` ``)

---

## Step 2: Navigate to Project

**COMMAND:**
```powershell
cd "d:\cursor tutorial\quiz-app"
```

**VERIFY:**
```powershell
pwd
```
Should show: `d:\cursor tutorial\quiz-app`

---

## Step 3: Verify package.json Exists

**COMMAND:**
```powershell
Test-Path package.json
```

**SHOULD RETURN:** `True`

**IF FALSE:** You're in the wrong directory. Go back to Step 2.

---

## Step 4: Check Node.js and npm

**COMMANDS:**
```powershell
node --version
npm --version
```

**SHOULD SHOW:** Version numbers (like `v18.17.0` and `9.5.0`)

**IF ERRORS:** Node.js is not installed. Install from https://nodejs.org/

---

## Step 5: Clear Any Issues

**COMMANDS:**
```powershell
# Clear npm cache
npm cache clean --force

# Make sure we're using public registry
npm config set registry https://registry.npmjs.org/

# Logout if there are token issues
npm logout
```

---

## Step 6: Install Dependencies

**COMMAND:**
```powershell
npm install
```

**WHAT TO WATCH FOR:**
- ✅ Should see "added X packages"
- ✅ Should see "up to date" or "audited X packages"
- ❌ Should NOT see "npm ERR!" in red
- ⏱️ Takes 2-5 minutes - BE PATIENT!

**DON'T CLOSE THE TERMINAL** while it's running!

---

## Step 7: Verify Installation

**AFTER npm install FINISHES:**

```powershell
# Check node_modules exists
Test-Path node_modules

# Should return: True

# Check it has content
dir node_modules | Measure-Object

# Should show hundreds of items

# Check specific packages
Test-Path node_modules\next
Test-Path node_modules\react
```

**ALL SHOULD RETURN:** `True`

---

## If npm install Fails

### Error: "EACCES" or "permission denied"
**FIX:** Run terminal as Administrator

### Error: "ECONNREFUSED" or network errors
**FIX:** Check internet connection, try:
```powershell
npm config set registry https://registry.npmjs.org/
npm install
```

### Error: Scripts disabled
**FIX:** Use Command Prompt instead of PowerShell, OR:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
npm install
```

### Installation stops with no error
**FIX:** Wait longer (can take 5+ minutes), check internet, try again

---

## Success Checklist

After running `npm install`, you should have:

- [ ] `node_modules` folder exists
- [ ] `package-lock.json` file exists
- [ ] `node_modules` contains hundreds of folders
- [ ] `node_modules\next` exists
- [ ] `node_modules\react` exists
- [ ] `node_modules\@instantdb` exists

---

## Once node_modules Exists

✅ **You're ready for Step 4!**

Continue with the setup guide:
- Step 4: Create Instant DB Account
- Step 5: Create App in Instant DB
- etc.

---

## Still Not Working?

**Share these details:**

1. **Output of:**
   ```powershell
   node --version
   npm --version
   pwd
   Test-Path package.json
   ```

2. **Full output from `npm install`** (especially any errors)

3. **What happens when you run `npm install`?**
   - Does it start?
   - Does it show any errors?
   - Does it complete?
