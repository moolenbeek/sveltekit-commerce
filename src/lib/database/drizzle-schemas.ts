import { pgTable, text, timestamp, integer, decimal, foreignKey } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
	id: text("id").notNull().primaryKey(),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	password: text("password"),
	token: text("token").unique()
});

export const sessionTable = pgTable("sessions", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

// New tables
export const productCategoryTable = pgTable("product_categories", {
	id: text("id").notNull().primaryKey(),
	name: text("name").notNull().unique(),
	description: text("description")
});

export const productTable = pgTable("products", {
	id: text("id").notNull().primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	categoryId: text("category_id").references(() => productCategoryTable.id)
});

export const productInventoryTable = pgTable("product_inventory", {
	id: text("id").notNull().primaryKey(),
	productId: text("product_id")
		.notNull()
		.references(() => productTable.id),
	quantity: integer("quantity").notNull(),
	lastUpdated: timestamp("last_updated", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export const cartItemTable = pgTable("cart_items", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	productId: text("product_id")
		.notNull()
		.references(() => productTable.id),
	quantity: integer("quantity").notNull(),
	addedAt: timestamp("added_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export type User = typeof userTable.$inferInsert;
export type Session = typeof sessionTable.$inferInsert;

// New types
export type ProductCategory = typeof productCategoryTable.$inferInsert;
export type Product = typeof productTable.$inferInsert;
export type ProductInventory = typeof productInventoryTable.$inferInsert;
export type CartItem = typeof cartItemTable.$inferInsert;
