# Step-by-Step Setup Guide

Follow these steps **exactly** in order. Each step tells you WHERE to do it and WHAT to do.

---

## Step 1: Open Terminal/Command Prompt

**WHERE:** Open PowerShell, Command Prompt, or Terminal on your Windows machine

**WHAT:** Navigate to the quiz-app directory

**COMMAND:**
```powershell
cd "d:\cursor tutorial\quiz-app"
```

**VERIFY:** You should see the prompt showing you're in the quiz-app directory

---

## Step 2: Install Node.js (if not already installed)

**WHERE:** Check if Node.js is installed

**COMMAND:**
```powershell
node --version
```

**IF YOU SEE AN ERROR:**
1. Go to: https://nodejs.org/
2. Download the LTS version (recommended)
3. Run the installer
4. Restart your terminal
5. Run `node --version` again to verify

**IF YOU SEE A VERSION NUMBER:** You're good! Continue to Step 3.

---

## Step 3: Install Project Dependencies

**WHERE:** In the terminal, make sure you're in `d:\cursor tutorial\quiz-app`

**IF YOU GET "Running Scripts is Disabled" ERROR:**
→ **STOP HERE** and read `FIX_SCRIPT_EXECUTION.md` first, then come back to this step.

**COMMAND:**
```powershell
npm install
```

**WHAT HAPPENS:** This will download all required packages (Next.js, React, Instant DB, etc.)

**EXPECTED OUTPUT:** You should see a list of packages being installed. Wait until it finishes (may take 2-5 minutes).

**IF YOU SEE "NPM notice access token expired":**
→ This is usually just a warning. **Check if packages are still installing:**
  - If YES: ✅ Ignore it and let installation finish
  - If NO: ❌ See `FIX_NPM_TOKEN.md` for solutions

**VERIFY:** You should now see a `node_modules` folder in the quiz-app directory.

**IF node_modules FOLDER DOESN'T EXIST:**
→ **STOP HERE** and read `FIX_NO_NODE_MODULES.md` - the installation didn't complete successfully.

**ALTERNATIVE IF SCRIPTS ARE DISABLED:**
- Use Command Prompt (cmd.exe) instead of PowerShell, OR
- Run: `Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process` first, OR
- See `FIX_SCRIPT_EXECUTION.md` for detailed solutions

---

## Step 4: Create Instant DB Account

**WHERE:** In your web browser

**STEPS:**
1. Open your browser
2. Go to: https://instantdb.com
3. Click "Sign Up" or "Get Started"
4. Sign up with your email
5. Verify your email if required
6. Log in to your account

**VERIFY:** You should be logged into the Instant DB dashboard

---

## Step 5: Create a New App in Instant DB

**WHERE:** In the Instant DB dashboard (in your browser)

**STEPS:**
1. Look for a button that says "New App", "Create App", or "+" (plus sign)
2. Click it
3. Give your app a name (e.g., "quiz-app" or "zhenghuan-quiz")
4. Click "Create" or "Save"

**WHAT YOU'LL SEE:** A dashboard for your new app with an **App ID**

**IMPORTANT:** Copy the App ID - it looks like: `abc123def456` or similar

---

## Step 6: Configure Environment Variables

**WHERE:** In the `quiz-app` folder, create/edit the `.env.local` file

**OPTION A - Using File Explorer:**
1. Open File Explorer
2. Navigate to: `d:\cursor tutorial\quiz-app`
3. Look for `.env.local.example` file
4. Copy it and rename the copy to `.env.local`
5. Open `.env.local` with Notepad or any text editor

**OPTION B - Using Terminal:**
```powershell
cd "d:\cursor tutorial\quiz-app"
copy .env.local.example .env.local
notepad .env.local
```

**WHAT TO EDIT:**
- Find the line: `NEXT_PUBLIC_INSTANT_APP_ID=your_app_id_here`
- Replace `your_app_id_here` with the App ID you copied from Step 5
- Example: `NEXT_PUBLIC_INSTANT_APP_ID=abc123def456`
- Save the file (Ctrl+S)

**VERIFY:** The `.env.local` file should contain your actual App ID (not "your_app_id_here")

---

## Step 7: Login to Instant DB CLI

**WHERE:** In your terminal (PowerShell/Command Prompt)

**MAKE SURE:** You're still in `d:\cursor tutorial\quiz-app`

**COMMAND:**
```powershell
npx instant-cli login
```

**WHAT HAPPENS:**
- It will open your browser
- You'll be asked to authorize the CLI
- Click "Authorize" or "Allow"
- Return to the terminal

**EXPECTED OUTPUT:** You should see a success message like "Logged in successfully"

**IF YOU GET AN ERROR:** Make sure you're logged into instantdb.com in your browser first, then try again.

---

## Step 8: Push Database Schema

**WHERE:** In your terminal (still in `d:\cursor tutorial\quiz-app`)

**COMMAND:**
```powershell
npx instant-cli push
```

**WHAT HAPPENS:** This uploads your database schema (TestSession and UserStats tables) to Instant DB

**EXPECTED OUTPUT:** You should see messages about pushing schema and permissions

**VERIFY:** Go back to your Instant DB dashboard in the browser, refresh the page. You should see your schema (testSessions and userStats entities) listed.

---

## Step 9: Copy Images Folder

**WHERE:** Using File Explorer

**STEPS:**
1. Open File Explorer
2. Navigate to: `d:\cursor tutorial\images`
3. **SELECT** the entire `images` folder (click on it once)
4. **COPY** it (Ctrl+C or right-click → Copy)
5. Navigate to: `d:\cursor tutorial\quiz-app\public`
6. **PASTE** it here (Ctrl+V or right-click → Paste)

**VERIFY:** You should now have:
- `d:\cursor tutorial\quiz-app\public\images\zhenhuan.png`
- `d:\cursor tutorial\quiz-app\public\images\huanghou_yixiu.png`
- And all other character images (13 total)

**CHECKLIST - These files should exist:**
- [ ] zhenhuan.png
- [ ] huanghou_yixiu.png
- [ ] huafei.png
- [ ] anlingrong.png
- [ ] shenmeizhuang.png
- [ ] duanfei.png
- [ ] guojunwang.png
- [ ] huangdi.png
- [ ] supeisheng.png
- [ ] jinxi.png
- [ ] huanbi.png
- [ ] gualiu.png
- [ ] jingfei.png

---

## Step 10: Start the Development Server

**WHERE:** In your terminal (still in `d:\cursor tutorial\quiz-app`)

**COMMAND:**
```powershell
npm run dev
```

**WHAT HAPPENS:**
- The Next.js development server starts
- It compiles your app
- You'll see output like:
  ```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in X seconds
  ```

**IMPORTANT:** Keep this terminal window open! The server needs to keep running.

---

## Step 11: Open the App in Browser

**WHERE:** In your web browser

**STEPS:**
1. Open your browser (Chrome, Edge, Firefox, etc.)
2. Go to: http://localhost:3000
3. Press Enter

**WHAT YOU SHOULD SEE:**
- The home page with "甄嬛传 · 台词宫闱问答" title
- A sign-in form asking for your email

**IF YOU SEE AN ERROR:**
- Make sure the terminal is still running `npm run dev`
- Check that Step 10 completed successfully
- Try refreshing the page (F5)

---

## Step 12: Test Sign In

**WHERE:** In your browser at http://localhost:3000

**STEPS:**
1. Enter your email address in the sign-in form
2. Click "Send Magic Code"
3. Check your email inbox
4. You should receive an email from Instant DB with a magic code
5. Click the link in the email OR enter the code when prompted

**WHAT HAPPENS:** You'll be logged in and see the home page with options to start a quiz

---

## Step 13: Test the Quiz

**WHERE:** In your browser

**STEPS:**
1. Click "Start Quiz" button
2. You should see the first 10 questions
3. Select an answer for a question
4. Notice: Your progress is automatically saved (check the terminal for any errors)
5. Answer a few questions
6. Click "提交本轮答案" (Submit Answers)
7. You should see feedback (correct/incorrect)

**VERIFY:** 
- Questions display correctly
- Character images show up (if images were copied correctly)
- Answers can be selected
- Progress bar updates

---

## Step 14: Test Resume Functionality

**WHERE:** In your browser

**STEPS:**
1. While in the quiz, answer a few questions
2. Close the browser tab (or navigate away)
3. Go back to http://localhost:3000
4. Click "Start Quiz" again
5. **EXPECTED:** It should ask if you want to resume OR automatically resume your previous session

**VERIFY:** Your previous answers should be restored

---

## Step 15: Complete a Test and Check Leaderboard

**WHERE:** In your browser

**STEPS:**
1. Complete all 3 pages of the quiz (30 questions total)
2. After completing, navigate to: http://localhost:3000/leaderboard
3. You should see your name/email in the leaderboard
4. Your correctness ratio should be displayed

**VERIFY:**
- Leaderboard shows your stats
- Correctness ratio is calculated correctly
- Other users (if any) are also listed

---

## Troubleshooting

### Problem: "npm is not recognized"
**SOLUTION:** Node.js is not installed. Go back to Step 2.

### Problem: "Cannot find module" errors
**SOLUTION:** Run `npm install` again (Step 3)

### Problem: "NEXT_PUBLIC_INSTANT_APP_ID is not defined"
**SOLUTION:** 
- Check that `.env.local` exists in `quiz-app` folder
- Check that it contains your actual App ID (not "your_app_id_here")
- Restart the dev server (Ctrl+C, then `npm run dev` again)

### Problem: Images don't show
**SOLUTION:**
- Verify images are in `quiz-app\public\images\`
- Check file names match exactly (case-sensitive)
- Restart the dev server

### Problem: "Schema push failed"
**SOLUTION:**
- Make sure you're logged in: `npx instant-cli login`
- Check your internet connection
- Try `npx instant-cli push` again

### Problem: Can't sign in / No magic code email
**SOLUTION:**
- Check spam folder
- Verify email address is correct
- Check Instant DB dashboard for any account issues

---

## Success Checklist

Before considering setup complete, verify:

- [ ] Node.js is installed (`node --version` works)
- [ ] Dependencies installed (`node_modules` folder exists)
- [ ] Instant DB account created
- [ ] App created in Instant DB dashboard
- [ ] `.env.local` file exists with your App ID
- [ ] Logged into Instant DB CLI (`npx instant-cli login` worked)
- [ ] Schema pushed successfully (`npx instant-cli push` worked)
- [ ] Images folder copied to `quiz-app\public\images\`
- [ ] Dev server runs (`npm run dev` works)
- [ ] App opens in browser (http://localhost:3000)
- [ ] Can sign in with email
- [ ] Quiz displays correctly
- [ ] Can answer questions
- [ ] Progress saves automatically
- [ ] Can resume a session
- [ ] Leaderboard displays

---

## Next Steps After Setup

Once everything works:

1. **Customize:** Edit questions in `quiz-app\lib\quiz-data.ts`
2. **Deploy:** When ready, deploy to Vercel or another hosting service
3. **Share:** Share the app with others to compete on the leaderboard!

---

## Need Help?

If you're stuck at any step:
1. Check the error message in the terminal
2. Review the troubleshooting section above
3. Verify you completed all previous steps
4. Make sure you're in the correct directory (`d:\cursor tutorial\quiz-app`)
