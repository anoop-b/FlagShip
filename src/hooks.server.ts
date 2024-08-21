import { dev } from '$app/environment';
import { authUser } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const start = performance.now();

	event.locals.user = await authUser(event);
	// TODO: remove dev mode later
	if (event.url.pathname.startsWith('/dashboard') && !dev) {
		if (!event.locals.user) {
			redirect(302, '/');
		}
	}

	console.log(`${event.url.pathname}:🚀 ${(performance.now() - start).toPrecision(3)} ms`);

	return resolve(event);
};
