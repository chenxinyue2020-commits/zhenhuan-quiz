# Fix: i.date is not a function Error

The CLI doesn't support `i.date()` directly. I've changed dates to use `i.number()` (timestamps) instead.

---

## What I Fixed

1. ✅ Changed `i.date()` to `i.number()` for all date fields
2. ✅ Changed import from `@instantdb/core` to `@instantdb/react` 
3. ✅ Added `useDateObjects: true` to db.ts to convert timestamps to Date objects automatically

---

## Why This Works

- **Dates stored as numbers:** Timestamps (milliseconds since epoch) are stored as numbers
- **Automatic conversion:** With `useDateObjects: true`, Instant DB converts them to JavaScript Date objects when reading
- **CLI compatible:** The CLI can read `i.number()` fields without issues

---

## Now Try Again

**WHERE:** In your terminal

**COMMAND:**
```powershell
cd "d:\cursor tutorial\quiz-app"
npx instant-cli push
```

**THIS SHOULD WORK NOW!** ✅

**EXPECTED OUTPUT:**
- "Pushing schema..."
- "Schema pushed successfully"
- No more "i.date is not a function" errors

---

## What Changed

**BEFORE (Error):**
```typescript
startedAt: i.date(), // ❌ CLI doesn't support this
```

**AFTER (Fixed):**
```typescript
startedAt: i.number(), // ✅ Stores timestamp as number
```

**In your code, dates will still work as Date objects** because of `useDateObjects: true` in db.ts!

---

## Verify It Works

**AFTER PUSHING:**

1. Check terminal for success message
2. Go to Instant DB dashboard
3. Refresh Schema tab
4. You should see `testSessions` and `userStats` entities

---

## How Dates Work Now

**When saving:**
```typescript
// Save as timestamp (number)
startedAt: Date.now() // or new Date().getTime()
```

**When reading:**
```typescript
// Automatically converted to Date object
const session = db.useQuery(...)
session.startedAt // This is a Date object, not a number!
```

---

## If You Still See Errors

**SHARE:**
1. Full error message from terminal
2. Output from `npx instant-cli push`
