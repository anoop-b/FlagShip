import type { Config } from "drizzle-kit";

export default {
  schema: "src/lib/drizzle/schema.ts",
  out: "src/lib/drizzle/migrations",
  dialect: "sqlite",
  driver: "d1-http",
  // TODO : replace with env values
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_D1_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
} satisfies Config;
