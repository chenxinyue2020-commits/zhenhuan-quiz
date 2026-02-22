import type { InstantRules } from "@instantdb/react";

const rules = {
  testSessions: {
    allow: {
      view: "auth.id != null && auth.id == data.userId",
      create: "auth.id != null",
      // 允许用户更新自己所有的测试会话（包含从 in_progress 改为 completed）
      update: "auth.id != null && auth.id == data.userId",
      delete: "auth.id != null && auth.id == data.userId",
    },
  },
  userStats: {
    allow: {
      view: true,
      create: "auth.id != null && auth.id == data.userId",
      update: "auth.id != null && auth.id == data.userId",
      delete: false,
    },
  },
} satisfies InstantRules;

export default rules;
