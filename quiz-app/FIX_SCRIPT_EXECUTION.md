# Fix: "Running Scripts is Disabled" Error

This error happens when PowerShell's execution policy blocks npm scripts. Here are **3 solutions** - try them in order.

---

## Solution 1: Enable Script Execution (Recommended)

**WHERE:** In PowerShell (run as Administrator)

**STEPS:**

1. **Open PowerShell as Administrator:**
   - Press `Windows Key`
   - Type "PowerShell"
   - Right-click on "Windows PowerShell"
   - Select "Run as Administrator"
   - Click "Yes" when prompted

2. **Run this command:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **When prompted, type:** `Y` and press Enter

4. **Verify it worked:**
   ```powershell
   Get-ExecutionPolicy
   ```
   Should show: `RemoteSigned`

5. **Close the Administrator PowerShell**

6. **Open a NEW regular PowerShell** (not as admin)

7. **Navigate to your project:**
   ```powershell
   cd "d:\cursor tutorial\quiz-app"
   ```

8. **Try npm install again:**
   ```powershell
   npm install
   ```

---

## Solution 2: Bypass for This Session Only

**WHERE:** In your current PowerShell window

**STEPS:**

1. **Run this command first:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
   ```

2. **Then run npm install:**
   ```powershell
   cd "d:\cursor tutorial\quiz-app"
   npm install
   ```

**NOTE:** This only works for the current PowerShell session. If you close and reopen PowerShell, you'll need to run it again.

---

## Solution 3: Use Command Prompt Instead

**WHERE:** Use Command Prompt (cmd.exe) instead of PowerShell

**STEPS:**

1. **Open Command Prompt:**
   - Press `Windows Key`
   - Type "cmd"
   - Press Enter

2. **Navigate to project:**
   ```cmd
   cd "d:\cursor tutorial\quiz-app"
   ```

3. **Run npm install:**
   ```cmd
   npm install
   ```

**NOTE:** Command Prompt doesn't have the same script execution restrictions, so this should work immediately.

---

## Solution 4: Use npm with --ignore-scripts Flag

**WHERE:** In your current PowerShell

**STEPS:**

1. **Navigate to project:**
   ```powershell
   cd "d:\cursor tutorial\quiz-app"
   ```

2. **Run npm install with flag:**
   ```powershell
   npm install --ignore-scripts
   ```

3. **Then install dependencies manually if needed:**
   ```powershell
   npm install @instantdb/react @instantdb/cli --save
   ```

**NOTE:** This might skip some post-install scripts, but core dependencies should install.

---

## Which Solution Should I Use?

- **If you have admin rights:** Use Solution 1 (permanent fix)
- **If you don't have admin rights:** Use Solution 2 (temporary) or Solution 3 (use Command Prompt)
- **If nothing else works:** Use Solution 4 (workaround)

---

## Verify It Worked

After running `npm install`, check:

```powershell
Test-Path node_modules
```

Should return: `True`

Also check:
```powershell
dir node_modules
```

Should show many folders (react, next, etc.)

---

## Still Having Issues?

If none of these work:

1. **Try Command Prompt** (Solution 3) - it's the easiest
2. **Check npm is installed:**
   ```powershell
   npm --version
   ```
   Should show a version number

3. **Check Node.js is installed:**
   ```powershell
   node --version
   ```
   Should show a version number

4. **Try updating npm:**
   ```powershell
   npm install -g npm@latest
   ```

---

## Quick Reference

**Enable scripts permanently (Admin PowerShell):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Enable scripts for this session only:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

**Use Command Prompt instead:**
- Open "cmd" instead of PowerShell
- Run commands normally
