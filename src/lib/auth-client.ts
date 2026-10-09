import { createAuthClient } from "better-auth/react";
import { env } from "process";
export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : (env.BETTER_AUTH_URL || "http://localhost:3000")
});