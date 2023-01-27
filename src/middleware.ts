import { NextRequest, NextResponse } from "next/server";
import { isValidToken } from "./utils";

export async function middleware(req: NextRequest) {

    const token = req.cookies.get('token')?.value || ''
    const is_valid = await isValidToken(token)

    // validamos que el usuario este autenticado verificando el token
    if (!is_valid) {
        const requestedPage = req.nextUrl.pathname
        const url = req.nextUrl.clone()
        url.pathname = '/auth/login'
        url.search = `p=${requestedPage}`
        return NextResponse.redirect(url)
    }

    return NextResponse.next()

}


export const config = {
    matcher: [
        '/home/:path*',
    ]
}