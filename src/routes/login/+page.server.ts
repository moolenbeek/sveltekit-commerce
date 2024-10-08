import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/database/lucia";
import { getUserByEmail } from "$lib/database/router/users";

// SuperForms imports
import { setError, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const load: PageServerLoad = async ({ locals, request }) => {
  if (locals.user) {
    throw redirect(302, "/");
  }
  const form = await superValidate(request, zod(loginSchema));
  return { form };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(loginSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    const { email, password } = form.data;

    const user = await getUserByEmail(email);

    if (!user || typeof user.password !== "string") {
      return setError(form, "email", "Invalid email or password");
    }

    const validPassword = await new Argon2id().verify(user.password, password);

    if (!validPassword) {
      return setError(form, "password", "Invalid email or password");
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    console.log(`Login successful for user: ${email}`);
    console.log(`Session ID: ${session.id}`);
    console.log(`Session Cookie: ${sessionCookie.value}`);
    throw redirect(302, "/");
  },
};
