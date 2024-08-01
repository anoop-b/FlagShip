import { redirect, type RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.delete("CF_Authorization", {
        path: '/'
    })
    throw redirect(303, "/")
}