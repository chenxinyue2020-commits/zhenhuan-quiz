import { permissions } from "@instantdb/schema";

export default permissions({
  rules: {
    testSessions: {
      create: { and: [{ "!=": [{ var: "userId" }, null] }] },
      read: {
        or: [
          { "==": [{ var: "$users.id" }, { var: "userId" }] },
          { "==": [{ var: "$users.role" }, "admin" }],
        ],
      },
      update: {
        and: [
          { "==": [{ var: "$users.id" }, { var: "userId" }] },
          { "==": [{ var: "status" }, "in_progress" }],
        ],
      },
      delete: { "==": [{ var: "$users.id" }, { var: "userId" }] },
    },
    userStats: {
      create: { "==": [{ var: "$users.id" }, { var: "userId" }] },
      read: true, // Everyone can read for leaderboard
      update: {
        or: [
          { "==": [{ var: "$users.id" }, { var: "userId" }] },
          { "==": [{ var: "$users.role" }, "admin" }],
        ],
      },
      delete: { "==": [{ var: "$users.role" }, "admin" }],
    },
  },
});
