# 甄嬛传 · 台词宫闱问答

A full-stack quiz application built with Next.js and Instant DB, featuring user authentication, progress saving, and a competitive leaderboard.

## Features

- **User Authentication**: Sign in with magic code email authentication
- **Progress Saving**: Automatically save your progress as you answer questions
- **Resume Tests**: Continue from where you left off if you need to pause
- **Leaderboard**: Compete with other users based on correctness ratio
- **Real-time Updates**: Leaderboard updates in real-time across all clients

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Instant DB** (Database & Authentication)
- **Tailwind CSS** (Styling)

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Instant DB account (sign up at [instantdb.com](https://instantdb.com))

### Installation

1. **Install dependencies:**
   ```bash
   cd quiz-app
   npm install
   ```

2. **Set up Instant DB:**
   - Sign up/login at [instantdb.com](https://instantdb.com)
   - Create a new app/project
   - Copy your App ID

3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local`
   - Add your Instant DB App ID:
     ```
     NEXT_PUBLIC_INSTANT_APP_ID=your_app_id_here
     ```

4. **Push schema to Instant DB:**
   ```bash
   npx instant-cli login
   npx instant-cli push
   ```

5. **Copy images:**
   - Copy the `images` folder from the root directory to `quiz-app/public/images`

6. **Run the development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
quiz-app/
├── app/
│   ├── layout.tsx              # Root layout with Instant DB provider
│   ├── page.tsx                 # Home/landing page
│   ├── quiz/
│   │   └── page.tsx             # Quiz page
│   ├── leaderboard/
│   │   └── page.tsx              # Leaderboard page
│   └── profile/
│       └── page.tsx              # User profile page
├── components/
│   ├── Auth/
│   │   ├── SignIn.tsx            # Sign in component
│   │   └── SignOut.tsx           # Sign out component
│   ├── Quiz/
│   │   ├── QuizContainer.tsx     # Main quiz logic
│   │   ├── QuestionBlock.tsx     # Question component
│   │   └── ProgressBar.tsx       # Progress indicator
│   ├── Leaderboard/
│   │   └── LeaderboardTable.tsx  # Leaderboard display
│   └── Layout/
│       ├── Header.tsx            # App header
│       └── Footer.tsx            # Footer
├── lib/
│   ├── db.ts                     # Instant DB client
│   ├── quiz-data.ts              # Quiz questions data
│   └── utils.ts                  # Utility functions
├── instant.schema.ts             # Database schema
└── instant.permissions.ts        # Permission rules
```

## Database Schema

### TestSession
Tracks individual quiz attempts with progress:
- `userId`: Link to user
- `status`: "in_progress" or "completed"
- `currentPage`: Current page number (0-2)
- `cumulativeScore`: Total correct answers
- `totalQuestionsAnswered`: Questions answered
- `answers`: Array of answer objects
- `characterStats`: Per-character statistics
- `startedAt`, `lastUpdatedAt`, `completedAt`: Timestamps

### UserStats
Aggregated statistics per user:
- `userId`: Link to user (unique)
- `totalTestsCompleted`: Number of completed tests
- `totalQuestionsAnswered`: Total questions answered
- `totalCorrectAnswers`: Total correct answers
- `overallCorrectnessRatio`: Calculated correctness ratio
- `bestScore`: Highest score in a single test
- `characterAccuracy`: Per-character accuracy stats

## Usage

1. **Sign In**: Enter your email to receive a magic code
2. **Start Quiz**: Click "Start Quiz" to begin
3. **Answer Questions**: Select answers for each question (10 questions per page)
4. **Submit Page**: Click "提交本轮答案" to grade the current page
5. **Continue**: Click "进入下一轮" to proceed to the next page
6. **Auto-save**: Your progress is automatically saved after each answer
7. **Resume**: If you leave, you can resume from your profile page
8. **Leaderboard**: View rankings based on correctness ratio

## Development

- **Run dev server**: `npm run dev`
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

## Notes

- The quiz contains 30 questions divided into 3 pages (10 questions each)
- Progress is saved automatically after each answer
- Only one active session per user (will resume existing session)
- Leaderboard shows top 50 users ranked by correctness ratio
- All styling uses light backgrounds as per user preference

## License

This project is for educational purposes.
