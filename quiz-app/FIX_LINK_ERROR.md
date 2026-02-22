# Fix: Invalid Schema Link Error

The error says links reference a non-existing entity. I've fixed the label names.

---

## What I Fixed

**Changed both forward labels to use `"$user"`** (with $ prefix) instead of `"user"`:
- This matches Instant DB's convention for linking to `$users`
- Both links now use `label: "$user"` in forward direction

---

## Try Push Again

**WHERE:** In your terminal

**COMMAND:**
```powershell
cd "d:\cursor tutorial\quiz-app"
npx instant-cli push
```

**THIS SHOULD WORK NOW!** ✅

---

## If It Still Fails

**Option 1: Remove Links Temporarily**

If links aren't essential right now, we can remove them:

```typescript
links: {}, // Empty for now
```

You can add links later once the basic schema works.

**Option 2: Simplify Links**

Maybe we only need one link, or a different format. Share the new error if it still fails.

---

## What Changed

**BEFORE:**
```typescript
forward: { on: "testSessions", has: "one", label: "user" }, // ❌
forward: { on: "userStats", has: "one", label: "user" },    // ❌ Duplicate!
```

**AFTER:**
```typescript
forward: { on: "testSessions", has: "one", label: "$user" }, // ✅
forward: { on: "userStats", has: "one", label: "$user" },   // ✅ Unique with $
```

---

## Verify Schema File

**Check that instant.schema.ts now has:**
- Both forward labels use `"$user"` (with $)
- Entities are defined correctly
- Links reference existing entities

---

## Next Steps

**ONCE PUSH SUCCEEDS:**
1. ✅ Schema will be in Instant DB dashboard
2. ✅ Continue to Step 9 (Copy Images)
3. ✅ Then Step 10 (Start Dev Server)
