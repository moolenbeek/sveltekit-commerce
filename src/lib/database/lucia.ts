import { dev } from "$app/environment";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import db from "$lib/database/db.server";
import { userTable, sessionTable } from "$lib/database/drizzle-schemas";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      firstName: string;
      lastName: string;
    };
  }
}

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
});
