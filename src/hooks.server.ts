import { dev } from "$app/environment";
import { authUser } from "$lib/server/auth";
import { redirect, type Handle } from "@sveltejs/kit";


export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = await authUser(event)
  // TODO: remove dev mode later
  if (event.url.pathname.startsWith("/dashboard") && !dev) {
    if (!event.locals.user) {
      redirect(302, "/")
    }
  }

  return resolve(event)
};
