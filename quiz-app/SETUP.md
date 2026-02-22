# Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Instant DB:**
   - Go to [instantdb.com](https://instantdb.com) and sign up/login
   - Create a new app
   - Copy your App ID

3. **Configure environment:**
   - Copy `.env.local.example` to `.env.local`
   - Add your App ID: `NEXT_PUBLIC_INSTANT_APP_ID=your_app_id_here`

4. **Push schema:**
   ```bash
   npx instant-cli login
   npx instant-cli push
   ```

5. **Copy images:**
   - Copy the `images` folder from the project root to `quiz-app/public/images`
   - The images should include all character images referenced in `lib/quiz-data.ts`

6. **Run the app:**
   ```bash
   npm run dev
   ```

7. **Open browser:**
   - Navigate to http://localhost:3000

## Image Files Required

Make sure these images exist in `public/images/`:
- zhenhuan.png
- huanghou_yixiu.png
- huafei.png
- anlingrong.png
- shenmeizhuang.png
- duanfei.png
- guojunwang.png
- huangdi.png
- supeisheng.png
- jinxi.png
- huanbi.png
- gualiu.png
- jingfei.png
