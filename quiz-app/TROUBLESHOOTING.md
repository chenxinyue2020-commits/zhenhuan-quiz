# Troubleshooting Guide - Exact Solutions

If something doesn't work, find your error below and follow the exact steps.

---

## Error: "npm is not recognized" or "node is not recognized"

**WHAT IT MEANS:** Node.js is not installed or not in your PATH

**EXACT SOLUTION:**
1. Go to: https://nodejs.org/
2. Download "LTS" version (the green button)
3. Run the installer
4. **IMPORTANT:** Check the box "Add to PATH" during installation
5. Close ALL terminal windows
6. Open a NEW terminal window
7. Run: `node --version`
8. If you see a version number, you're good!

**IF STILL NOT WORKING:**
- Restart your computer
- Try again

---

## Error: "Cannot find module '@instantdb/react'"

**WHAT IT MEANS:** Dependencies not installed

**EXACT SOLUTION:**
```powershell
cd "d:\cursor tutorial\quiz-app"
npm install
```
Wait for it to finish (2-5 minutes)

**VERIFY:**
- Check that `node_modules` folder exists in `quiz-app` directory
- If it doesn't exist, run `npm install` again

---

## Error: "NEXT_PUBLIC_INSTANT_APP_ID is not defined"

**WHAT IT MEANS:** Environment variable not set

**EXACT SOLUTION:**

### Step 1: Check if file exists
```powershell
cd "d:\cursor tutorial\quiz-app"
Test-Path .env.local
```
Should return: `True`

### Step 2: If False, create the file
```powershell
copy .env.local.example .env.local
```

### Step 3: Edit the file
```powershell
notepad .env.local
```
Make sure it contains:
```
NEXT_PUBLIC_INSTANT_APP_ID=your_actual_app_id_here
```
(Replace `your_actual_app_id_here` with your real App ID)

### Step 4: Save and restart
- Save the file (Ctrl+S)
- Close Notepad
- Stop the dev server (Ctrl+C in terminal)
- Start again: `npm run dev`

---

## Error: "instant-cli: command not found" or "npx instant-cli login" fails

**WHAT IT MEANS:** Instant DB CLI not installed

**EXACT SOLUTION:**
```powershell
cd "d:\cursor tutorial\quiz-app"
npm install -g @instantdb/cli
```

**THEN TRY AGAIN:**
```powershell
npx instant-cli login
```

**IF STILL FAILING:**
- Make sure you're connected to the internet
- Try: `npm install @instantdb/cli --save-dev`
- Then: `npx instant-cli login`

---

## Error: "Schema push failed" or "Permission denied"

**EXACT SOLUTION:**

### Step 1: Make sure you're logged in
```powershell
npx instant-cli login
```
(Should open browser and ask for authorization)

### Step 2: Check your internet connection
- Open browser, go to https://instantdb.com
- Make sure you can access it

### Step 3: Verify you're in the right directory
```powershell
cd "d:\cursor tutorial\quiz-app"
dir instant.schema.ts
```
(Should show the file)

### Step 4: Try push again
```powershell
npx instant-cli push
```

**IF STILL FAILING:**
- Check Instant DB dashboard - make sure your app exists
- Try logging out and back in: `npx instant-cli logout` then `npx instant-cli login`

---

## Error: Images don't show / "404 Not Found" for images

**WHAT IT MEANS:** Images not in the correct location

**EXACT SOLUTION:**

### Step 1: Check if images folder exists
```powershell
cd "d:\cursor tutorial\quiz-app"
Test-Path public\images
```
Should return: `True`

### Step 2: Check if images are there
```powershell
dir public\images
```
Should show all 13 image files

### Step 3: If folder doesn't exist, create it
```powershell
mkdir public\images
```

### Step 4: Copy images
**Using File Explorer:**
1. Go to: `d:\cursor tutorial\images`
2. Select all files (Ctrl+A)
3. Copy (Ctrl+C)
4. Go to: `d:\cursor tutorial\quiz-app\public\images`
5. Paste (Ctrl+V)

**OR using PowerShell:**
```powershell
Copy-Item "d:\cursor tutorial\images\*" -Destination "d:\cursor tutorial\quiz-app\public\images\" -Recurse
```

### Step 5: Restart dev server
- Stop server (Ctrl+C)
- Start again: `npm run dev`

---

## Error: "Port 3000 is already in use"

**WHAT IT MEANS:** Another app is using port 3000

**EXACT SOLUTION:**

### Option 1: Kill the process using port 3000
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Note the PID (last number)
# Kill it (replace XXXX with the PID)
taskkill /PID XXXX /F
```

### Option 2: Use a different port
```powershell
# Start on port 3001 instead
$env:PORT=3001; npm run dev
```
Then open: http://localhost:3001

---

## Error: "Cannot GET /" or blank page

**WHAT IT MEANS:** Dev server not running or wrong URL

**EXACT SOLUTION:**

### Step 1: Check if server is running
Look at your terminal - should see:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
```

### Step 2: If not running, start it
```powershell
cd "d:\cursor tutorial\quiz-app"
npm run dev
```

### Step 3: Wait for compilation
Wait until you see "Ready" message

### Step 4: Open correct URL
- Go to: http://localhost:3000
- NOT: http://localhost:3000/quiz
- Start from the home page

---

## Error: "Email magic code not received"

**EXACT SOLUTION:**

### Step 1: Check spam folder
- Look in your email spam/junk folder
- Search for "Instant DB" or "magic code"

### Step 2: Check email address
- Make sure you entered the correct email
- Try signing in again with the same email

### Step 3: Check Instant DB account
- Go to https://instantdb.com
- Log in
- Check if there are any account issues

### Step 4: Try a different email
- Use a different email address
- Some email providers block automated emails

---

## Error: "Failed to save progress" or database errors

**EXACT SOLUTION:**

### Step 1: Check .env.local
```powershell
cd "d:\cursor tutorial\quiz-app"
notepad .env.local
```
Verify App ID is correct

### Step 2: Check schema is pushed
```powershell
npx instant-cli push
```
Should say "Schema pushed successfully"

### Step 3: Check Instant DB dashboard
- Go to https://instantdb.com
- Open your app
- Check if `testSessions` and `userStats` entities exist

### Step 4: Restart dev server
- Stop (Ctrl+C)
- Start again: `npm run dev`

---

## Error: "Module not found" or import errors

**EXACT SOLUTION:**

### Step 1: Reinstall dependencies
```powershell
cd "d:\cursor tutorial\quiz-app"
rm -r node_modules
npm install
```

**OR on Windows PowerShell:**
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Step 2: Clear Next.js cache
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

---

## Error: TypeScript errors in terminal

**WHAT IT MEANS:** Usually not critical, but can be annoying

**EXACT SOLUTION:**

### If it's just warnings:
- You can ignore them for now
- The app should still work

### If it's blocking compilation:
```powershell
cd "d:\cursor tutorial\quiz-app"
npm install --save-dev typescript @types/node @types/react @types/react-dom
```

---

## Error: "Access denied" when copying files

**EXACT SOLUTION:**

### Run PowerShell as Administrator:
1. Right-click on PowerShell
2. Select "Run as Administrator"
3. Navigate to project: `cd "d:\cursor tutorial\quiz-app"`
4. Try your command again

---

## Still Having Issues?

### Check These Basics:

1. **Are you in the right directory?**
   ```powershell
   pwd
   # Should show: d:\cursor tutorial\quiz-app
   ```

2. **Is Node.js installed?**
   ```powershell
   node --version
   # Should show: v18.x.x or higher
   ```

3. **Are dependencies installed?**
   ```powershell
   Test-Path node_modules
   # Should return: True
   ```

4. **Is .env.local configured?**
   ```powershell
   Test-Path .env.local
   # Should return: True
   ```

5. **Are images copied?**
   ```powershell
   Test-Path public\images\zhenhuan.png
   # Should return: True
   ```

6. **Is dev server running?**
   - Check terminal for "Ready" message
   - Should see: http://localhost:3000

---

## Get More Help

If none of these solutions work:

1. **Copy the exact error message** from your terminal
2. **Note which step** you were on (from STEP_BY_STEP_SETUP.md)
3. **Check the error** appears in this troubleshooting guide
4. **Try the solution** provided

Common issues are usually:
- Wrong directory
- Missing .env.local file
- Images not copied
- Dependencies not installed
- Dev server not running
