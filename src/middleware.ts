import { NextRequest, NextResponse } from "next/server";
import { isValidToken } from "./utils";

export async function middleware(req: NextRequest) {

    const token = req.cookies.get('token')?.value || ''
    const is_valid = await isValidToken(token)


    // validamos que el usuario este autenticado verificando el token
    if (req.nextUrl.pathname.startsWith('/home') || req.nextUrl.pathname.startsWith('/tests')) {
        if (!is_valid) {
            const requestedPage = req.nextUrl.pathname
            const url = req.nextUrl.clone()
            url.pathname = '/auth/login'
            url.search = `p=${requestedPage}`
            return NextResponse.redirect(url)
        }
    }

    // proteccion api, no cubre la carpeta auth, porque no la estamos pasando como matcher, no tendria sentido
    if (req.nextUrl.pathname.startsWith('/api')) {
        if(!is_valid){
            return NextResponse.rewrite(new URL('/api/auth/unauthorized', req.url))
        }
    }


    return NextResponse.next()

}


export const config = {
    matcher: [
        // PAGINAS:
        '/home/:path*',
        '/tests/:path*',
        // API:
        '/api/categories/:path*',
        '/api/seed/:path*',
        '/api/words/:path*'
    ]
}