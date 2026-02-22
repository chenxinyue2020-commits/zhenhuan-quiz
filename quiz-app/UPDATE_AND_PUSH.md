# Update Packages and Push Schema

Your packages are version 0.12.37, which is old. The CLI might expect newer versions. Let's update them.

---

## Step 1: Update Packages

**WHERE:** In your terminal

**COMMAND:**
```powershell
cd "d:\cursor tutorial\quiz-app"
npm install @instantdb/react@latest @instantdb/core@latest
```

**WHAT THIS DOES:** Updates both packages to the latest version (should be 0.22.x)

**EXPECTED:** Should install newer versions

---

## Step 2: Verify Versions

**COMMAND:**
```powershell
npm list @instantdb/react
npm list @instantdb/core
```

**SHOULD SHOW:** Version 0.22.x or higher (not 0.12.37)

---

## Step 3: Try Push Again

**COMMAND:**
```powershell
npx instant-cli push
```

**THIS SHOULD WORK** with the updated packages! ✅

---

## If Update Fails

**Try removing and reinstalling:**
```powershell
npm uninstall @instantdb/react @instantdb/core
npm install @instantdb/react@latest @instantdb/core@latest
```

---

## Alternative: Check CLI Version

**The CLI itself might be outdated:**

```powershell
npx instant-cli@latest push
```

Using `@latest` ensures you're using the newest CLI version.

---

## What Changed

**BEFORE:**
- `@instantdb/react`: 0.12.37 (old)
- `@instantdb/core`: 0.12.37 (old)

**AFTER:**
- `@instantdb/react`: 0.22.x (latest)
- `@instantdb/core`: 0.22.x (latest)

The newer versions should have the correct `i.schema()` API that the CLI expects.
