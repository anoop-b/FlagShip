import * as jose from 'jose';
import { CLOUDFLARE_TEAM_DOMAIN, CLOUDFLARE_POLICY_AUD } from '$env/static/private';
import { type RequestEvent } from '@sveltejs/kit';

const CERTS_URL = `${CLOUDFLARE_TEAM_DOMAIN}/cdn-cgi/access/certs`;

interface JWTPayload extends jose.JWTPayload {
	email: string;
}

export const authUser = async (event: RequestEvent) => {
	const token = event.cookies.get('CF_Authorization');

	if (token) {
		try {
			const JWKS = jose.createRemoteJWKSet(new URL(CERTS_URL));
			const { payload } = await jose.jwtVerify<JWTPayload>(token, JWKS, {
				audience: CLOUDFLARE_POLICY_AUD
			});
			return {
				email: payload.email
			};
		} catch (e) {
			console.log(e);
			return null;
		}
	}
	return null;
};
