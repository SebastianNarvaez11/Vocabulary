import * as jose from "jose";


export const createToken = async (_id: string, email: string) => {
    // validamos que exista la firma del token en la variables de entorno
    if (!process.env.JWT_SECRET_SIGN) {
        throw new Error('No existe una firma para el token, revise las variables de entorno')
    }

    const alg = 'HS256'

    // creamos un token, el cual tiene como payload el id y el email
    return await new jose.SignJWT({ _id, email })
        .setProtectedHeader({ alg })
        .setExpirationTime('30d')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET_SIGN || ""))
}



export const isValidToken = async (token: string): Promise<boolean> => {
    if (!process.env.JWT_SECRET_SIGN) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    try {
        await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SIGN || ""));
        return true

    } catch (error) {
        return false
    }
}



export const getIdToken = async (token: string): Promise<string> => {
    if (!process.env.JWT_SECRET_SIGN) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    try {
        const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SIGN || ""));
        return payload._id as string

    } catch (error) {
        return ''
    }
}

