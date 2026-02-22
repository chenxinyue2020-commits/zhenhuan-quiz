# Fix: Cannot find module '@instantdb/schema'

The error is because `@instantdb/schema` doesn't exist as a package. I've fixed it!

---

## What I Fixed

1. ✅ Added `@instantdb/core` to package.json (needed for schema)
2. ✅ Updated `instant.schema.ts` to use correct Instant DB format
3. ✅ Changed import from `@instantdb/schema` to `@instantdb/core`

---

## Step 1: Install the Missing Package

**WHERE:** In your terminal

**COMMAND:**
```powershell
cd "d:\cursor tutorial\quiz-app"
npm install
```

**WHAT THIS DOES:** Installs `@instantdb/core` package

**EXPECTED:** Should complete successfully

---

## Step 2: Push Schema Again

**WHERE:** In your terminal

**COMMAND:**
```powershell
npx instant-cli push
```

**THIS SHOULD WORK NOW!** ✅

**EXPECTED OUTPUT:**
- "Pushing schema..."
- "Schema pushed successfully"
- No more "Cannot find module" errors

---

## Step 3: Verify in Dashboard

**WHERE:** In your browser

**STEPS:**
1. Go to Instant DB dashboard
2. Click "Schema" tab
3. **Refresh the page** (F5)
4. You should now see:
   - `testSessions` entity
   - `userStats` entity

---

## What Changed

**BEFORE (Wrong):**
```typescript
import { schema } from "@instantdb/schema"; // ❌ Doesn't exist
```

**AFTER (Correct):**
```typescript
import { i } from "@instantdb/core"; // ✅ Correct package
const schema = i.schema({...}); // ✅ Correct format
```

---

## If You Still See Errors

**SHARE:**
1. Output from `npm install`
2. Output from `npx instant-cli push`
3. Any error messages

---

## Next Steps

**ONCE SCHEMA PUSHES SUCCESSFULLY:**

1. ✅ Continue to Step 9 (Copy Images)
2. ✅ Then Step 10 (Start Dev Server)
3. ✅ Your app should work!
