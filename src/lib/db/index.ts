import { getCloudflareContext } from "@opennextjs/cloudflare";
import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";

import * as schema from "@/drizzle/schema";

export const createDb = (): DrizzleD1Database<typeof schema> & {
  $client: D1Database;
} => {
  return drizzle(getCloudflareContext().env.DB, { schema });
};
