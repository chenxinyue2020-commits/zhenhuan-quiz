"use client";

import { db } from "@/lib/db";

export default function SignOut() {
  const handleSignOut = async () => {
    await db.auth.signOut();
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
    >
      Sign Out
    </button>
  );
}
