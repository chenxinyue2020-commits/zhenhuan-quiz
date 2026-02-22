import { init } from "@instantdb/react";
import schema from "../instant.schema";
import rules from "../instant.perms";

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID;

if (!APP_ID) {
  throw new Error("NEXT_PUBLIC_INSTANT_APP_ID is not set");
}

export const db = init({
  appId: APP_ID,
  schema,
  rules,
  useDateObjects: true, // Convert number timestamps to Date objects
});
