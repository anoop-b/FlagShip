import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { dev } from "$app/environment";

export const load: LayoutServerLoad = async ({ locals }) => {
  // TODO: remove dev mode later
  if (!locals.user && !dev) {
    redirect(302, "/");
  }
};