# How to Ensure Latest Versions Are Installed

Here's how to make sure you get the latest versions when running `npm install`.

---

## Current Status

I've already updated your `package.json` to use `^0.22.0`, which means:
- It will install version `0.22.0` or higher
- It will get the latest `0.22.x` version (like `0.22.119` if that's the latest)
- It won't automatically upgrade to `0.23.0` (major version changes)

---

## Method 1: Use @latest Explicitly (Recommended)

**UPDATE package.json to use `@latest`:**

Change from:
```json
"@instantdb/react": "^0.22.0",
"@instantdb/core": "^0.22.0",
```

To:
```json
"@instantdb/react": "latest",
"@instantdb/core": "latest",
```

**OR use the install command directly:**
```powershell
npm install @instantdb/react@latest @instantdb/core@latest --save
```

This will:
- Install the absolute latest version available
- Update package.json automatically
- Work even if a newer major version comes out

---

## Method 2: Check What's Available First

**BEFORE running npm install, check latest versions:**

```powershell
npm view @instantdb/react version
npm view @instantdb/core version
```

**This shows:** The latest version available on npm

**Then install that specific version:**
```powershell
npm install @instantdb/react@0.22.119 @instantdb/core@0.22.119
```

---

## Method 3: Update package-lock.json

**If you want to force update existing packages:**

```powershell
# Remove lock file (forces fresh resolution)
Remove-Item package-lock.json

# Install fresh (will get latest matching ^0.22.0)
npm install
```

---

## Method 4: Use npm update

**To update packages to latest within version range:**

```powershell
npm update @instantdb/react @instantdb/core
```

This updates to the latest version that matches `^0.22.0` in package.json.

---

## Verify After Installation

**After running npm install, check what actually got installed:**

```powershell
npm list @instantdb/react
npm list @instantdb/core
```

**OR check package-lock.json:**
```powershell
Get-Content package-lock.json | Select-String "@instantdb/react" -Context 2
```

---

## Recommended Approach

**For your situation, I recommend:**

```powershell
cd "d:\cursor tutorial\quiz-app"

# Install latest versions explicitly
npm install @instantdb/react@latest @instantdb/core@latest --save

# Verify versions
npm list @instantdb/react @instantdb/core
```

**This will:**
1. ✅ Install the absolute latest versions
2. ✅ Update package.json automatically
3. ✅ Ensure compatibility with the CLI

---

## Understanding Version Ranges

- `"latest"` or `"*"` → Gets absolute latest version
- `"^0.22.0"` → Gets latest 0.22.x (won't go to 0.23.0)
- `"~0.22.0"` → Gets latest 0.22.x (more restrictive)
- `"0.22.0"` → Gets exactly that version only

---

## Quick Command to Get Latest

**Run this to ensure latest versions:**

```powershell
cd "d:\cursor tutorial\quiz-app"
npm install @instantdb/react@latest @instantdb/core@latest --save-exact
```

The `--save-exact` flag will save the exact version number to package.json (like `"0.22.119"` instead of `"^0.22.0"`).
