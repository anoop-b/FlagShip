import { authUser } from "$lib/server/auth";
import { redirect, type Handle } from "@sveltejs/kit";


export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = await authUser(event)

  if (event.url.pathname.startsWith("/dashboard")) {
    if (!event.locals.user) {
      redirect(302, "/")
    }
  }

  return resolve(event)
};
