# Deploy to Vercel - Step by Step Guide

## Prerequisites Completed ✅

- ✅ InstantDB configured (App ID: `4013db5b-df43-4cfe-a144-139f301ce5ad`)
- ✅ Environment variables set in `.env.local`
- ✅ Schema and permissions configured
- ✅ `lib/db.ts` file updated with rules
- ✅ Images copied to `public/images/`
- ✅ Build tested locally

## Deployment Steps

### Step 1: Prepare Git Repository

**Option A: Use Parent Directory Git (Recommended)**

Since Git is already initialized in `d:\cursor tutorial\`, you can:

1. **Remove Git lock file (if exists):**
   ```powershell
   cd "d:\cursor tutorial"
   Remove-Item -Force .git\index.lock -ErrorAction SilentlyContinue
   ```

2. **Add and commit quiz-app files:**
   ```powershell
   git add quiz-app/
   git commit -m "Add Zhen Huan quiz app for Vercel deployment"
   ```

**Option B: Create Separate Git Repo in quiz-app**

1. **Remove lock file:**
   ```powershell
   cd "d:\cursor tutorial\quiz-app"
   Remove-Item -Force ..\.git\index.lock -ErrorAction SilentlyContinue
   ```

2. **Initialize Git:**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit: Zhen Huan quiz app"
   ```

### Step 2: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it: `zhenhuan-quiz` (or any name you prefer)
   - Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Push code to GitHub:**

   **If using parent directory Git:**
   ```powershell
   cd "d:\cursor tutorial"
   git remote add origin https://github.com/YOUR_USERNAME/zhenhuan-quiz.git
   git branch -M main
   git push -u origin main
   ```

   **If using quiz-app Git:**
   ```powershell
   cd "d:\cursor tutorial\quiz-app"
   git remote add origin https://github.com/YOUR_USERNAME/zhenhuan-quiz.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Deploy to Vercel

#### Method A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Project:**
   - Click "Add New Project"
   - Select your GitHub repository (`zhenhuan-quiz`)
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** 
     - If repo contains only `quiz-app`: Leave blank or set to `.`
     - If repo is parent directory: Set to `quiz-app`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variable:**
   - Click "Environment Variables"
   - Add:
     - **Name:** `NEXT_PUBLIC_INSTANT_APP_ID`
     - **Value:** `4013db5b-df43-4cfe-a144-139f301ce5ad`
     - **Environment:** Production, Preview, Development (select all)
   - Click "Save"

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)

#### Method B: Via Vercel CLI

1. **Install Vercel CLI:**
   ```powershell
   npm install -g vercel
   ```

2. **Login:**
   ```powershell
   cd "d:\cursor tutorial\quiz-app"
   vercel login
   ```

3. **Deploy:**
   ```powershell
   vercel --prod
   ```
   - Follow prompts
   - When asked for environment variables, add:
     - `NEXT_PUBLIC_INSTANT_APP_ID` = `4013db5b-df43-4cfe-a144-139f301ce5ad`

### Step 4: Verify Deployment

After deployment completes:

1. **Visit your deployed URL:**
   - Vercel will provide a URL like: `https://your-app.vercel.app`
   - Or check the Vercel dashboard for the URL

2. **Test the application:**
   - ✅ Sign in with email (authentication)
   - ✅ Start a quiz (quiz functionality)
   - ✅ Check if images load (character portraits)
   - ✅ Complete a quiz and check leaderboard
   - ✅ Verify data persists (InstantDB connection)

### Step 5: Configure Custom Domain (Optional)

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed by Vercel

## Troubleshooting

### Build Fails

**Error: Missing environment variable**
- Solution: Ensure `NEXT_PUBLIC_INSTANT_APP_ID` is set in Vercel dashboard

**Error: Module not found**
- Solution: Run `npm install` locally and commit `package-lock.json`

**Error: Images not loading**
- Solution: Verify `public/images/` folder is committed to Git

### InstantDB Connection Fails

**Error: App ID not found**
- Solution: Double-check environment variable in Vercel matches `.env.local`

**Error: Schema mismatch**
- Solution: Run `npx instant-cli push` again before deploying

### Git Issues

**Error: Lock file exists**
- Solution: Remove `.git/index.lock` manually:
  ```powershell
  Remove-Item -Force "d:\cursor tutorial\.git\index.lock"
  ```

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created and linked to GitHub
- [ ] Environment variable configured in Vercel
- [ ] Build completes successfully
- [ ] App accessible at Vercel URL
- [ ] Authentication works
- [ ] Quiz functionality works
- [ ] Images display correctly
- [ ] Leaderboard updates
- [ ] Data persists in InstantDB

## Next Steps After Deployment

1. **Share your app:** Send the Vercel URL to friends
2. **Monitor usage:** Check Vercel dashboard for analytics
3. **Update code:** Push changes to GitHub, Vercel auto-deploys
4. **Set up custom domain:** Add your own domain name

## Support

If you encounter issues:
1. Check Vercel build logs in dashboard
2. Verify environment variables are set correctly
3. Ensure InstantDB schema is pushed
4. Check browser console for client-side errors
