import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('CF_Authorization', {
		path: '/'
	});
	throw redirect(303, '/');
};
