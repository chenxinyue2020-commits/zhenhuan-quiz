import { i } from "@instantdb/core";

const _schema = i.schema({
  entities: {
    testSessions: i.entity({
      userId: i.string(),
      status: i.string(),
      currentPage: i.number(),
      cumulativeScore: i.number(),
      totalQuestionsAnswered: i.number(),
      answers: i.json(),
      characterStats: i.json(),
      // 题目顺序（存的是题库中的索引），用于保证每次测试的 30 题顺序固定可恢复
      questionOrder: i.json().optional(),
      startedAt: i.number(),
      lastUpdatedAt: i.number(),
      completedAt: i.number().optional(),
    }),
    userStats: i.entity({
      userId: i.string().unique(),
      displayName: i.string().optional(),
      totalTestsCompleted: i.number(),
      totalQuestionsAnswered: i.number(),
      totalCorrectAnswers: i.number(),
      overallCorrectnessRatio: i.number(),
      bestScore: i.number(),
      lastTestDate: i.number().optional(),
      characterAccuracy: i.json(),
    }),
  },
  links: {},
});

// This helps TypeScript display better intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
