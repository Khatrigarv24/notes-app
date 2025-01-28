import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
export const db = drizzle(process.env.DATABASE_URL!);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
