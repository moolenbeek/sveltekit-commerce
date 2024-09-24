import { pgTable, text, timestamp, integer, decimal, foreignKey } from "drizzle-orm/pg-core";

export const userTable = pgTable('users', {
	id: text('id').notNull().primaryKey(),
	email: text('email').notNull().unique(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	role: text('role').notNull().default('USER'),
	password: text('password'),
	token: text('token').unique(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export type User = typeof userTable.$inferInsert;
