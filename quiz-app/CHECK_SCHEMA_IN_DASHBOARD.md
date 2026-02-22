# How to Check Schema in Instant DB Dashboard

After running `npx instant-cli push`, here's how to verify your schema in the Instant DB website.

---

## Step 1: Open Instant DB Dashboard

**WHERE:** In your web browser

**URL:** https://instantdb.com

**STEPS:**
1. Go to https://instantdb.com
2. Log in with your account
3. You should see your apps/dashboard

---

## Step 2: Select Your App

**WHERE:** In the Instant DB dashboard

**STEPS:**
1. Find your app in the list (or click on it)
2. Click on your app name
3. This opens your app's dashboard

---

## Step 3: Find the Schema/Data Section

**WHERE:** In your app's dashboard

**LOOK FOR ONE OF THESE TABS/SECTIONS:**
- **"Schema"** tab
- **"Data"** tab
- **"Explorer"** tab
- **"Entities"** section
- **"Database"** section
- **"Tables"** section

**COMMON LOCATIONS:**
- Top navigation bar (tabs)
- Left sidebar menu
- Main dashboard area

---

## Step 4: Verify Your Entities

**WHAT YOU SHOULD SEE:**

After pushing the schema, you should see **2 entities**:

1. **`testSessions`**
   - Should show fields like: `userId`, `status`, `currentPage`, `cumulativeScore`, etc.

2. **`userStats`**
   - Should show fields like: `userId`, `totalTestsCompleted`, `overallCorrectnessRatio`, etc.

**YOU MIGHT ALSO SEE:**
- `$users` - This is the built-in users table (automatic)

---

## Step 5: Check Entity Details

**CLICK ON EACH ENTITY** to see:
- Field names
- Field types (string, number, date, json, etc.)
- Required fields
- Relationships/links

**FOR `testSessions`, YOU SHOULD SEE:**
- `userId` (string, required)
- `status` (string, required, enum: "in_progress" | "completed")
- `currentPage` (number, required)
- `cumulativeScore` (number, required)
- `totalQuestionsAnswered` (number, required)
- `answers` (json, required)
- `characterStats` (json, required)
- `startedAt` (date, required)
- `lastUpdatedAt` (date, required)
- `completedAt` (date, optional)

**FOR `userStats`, YOU SHOULD SEE:**
- `userId` (string, required, unique)
- `totalTestsCompleted` (number, required)
- `totalQuestionsAnswered` (number, required)
- `totalCorrectAnswers` (number, required)
- `overallCorrectnessRatio` (number, required)
- `bestScore` (number, required)
- `lastTestDate` (date, optional)
- `characterAccuracy` (json, required)

---

## Alternative: Check via Explorer/Data View

**SOME DASHBOARDS HAVE AN "EXPLORER" TAB:**

1. Click **"Explorer"** or **"Data"** tab
2. You should see a list of your entities/tables
3. Click on `testSessions` or `userStats`
4. You can see the structure and any data

---

## If You Don't See the Schema

**POSSIBLE REASONS:**

1. **Schema wasn't pushed successfully**
   - Go back to terminal
   - Run: `npx instant-cli push` again
   - Check for any error messages

2. **Wrong app selected**
   - Make sure you're looking at the correct app
   - Check the App ID matches: `4013db5b-df43-4cfe-a144-139f301ce5ad`

3. **Need to refresh**
   - Refresh the browser page (F5)
   - Sometimes the dashboard needs a refresh

4. **Schema section in different location**
   - Look around the dashboard
   - Check all tabs and menus
   - Some dashboards have it under "Settings" → "Schema"

---

## Quick Verification Checklist

After pushing schema, verify:

- [ ] Logged into Instant DB dashboard
- [ ] Selected the correct app
- [ ] Found Schema/Data/Explorer section
- [ ] See `testSessions` entity
- [ ] See `userStats` entity
- [ ] Can see field definitions

---

## What the Schema Should Look Like

**In the dashboard, you should see something like:**

```
Entities:
├── $users (built-in)
├── testSessions
│   ├── userId: string (required)
│   ├── status: string (required, enum)
│   ├── currentPage: number (required)
│   ├── cumulativeScore: number (required)
│   └── ... (other fields)
└── userStats
    ├── userId: string (required, unique)
    ├── totalTestsCompleted: number (required)
    ├── overallCorrectnessRatio: number (required)
    └── ... (other fields)
```

---

## If Schema Push Failed

**CHECK TERMINAL OUTPUT:**

After running `npx instant-cli push`, you should see:
- ✅ "Schema pushed successfully"
- ✅ "Permissions updated"
- ❌ Any error messages

**IF YOU SEE ERRORS:**
- Share the error message
- Check that you're logged in: `npx instant-cli login`
- Try pushing again: `npx instant-cli push`

---

## Next Steps

**ONCE YOU VERIFY THE SCHEMA EXISTS:**

1. ✅ Schema is in dashboard → Continue to Step 9 (Copy Images)
2. ✅ Everything looks correct → You're ready to proceed!

**IF SCHEMA IS MISSING:**

1. ❌ Go back to terminal
2. ❌ Run `npx instant-cli push` again
3. ❌ Check for errors
4. ❌ Refresh dashboard and check again

---

## Need Help Finding It?

**COMMON DASHBOARD LAYOUTS:**

**Layout 1:**
- Top tabs: Overview | Schema | Data | Settings
- Click "Schema" tab

**Layout 2:**
- Left sidebar: Dashboard | Entities | Data | Settings
- Click "Entities" in sidebar

**Layout 3:**
- Main area shows: "Your Entities" or "Database Tables"
- Click on entity names to see details

**If you can't find it, describe what you see** in your dashboard and I can help guide you!
