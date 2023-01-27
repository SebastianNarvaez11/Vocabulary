import { createToken } from './../../../utils/jwt';
import bcrypt from 'bcryptjs';
import { UserModel } from '@/models';
import { db } from '@/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidEmail } from '@/utils';
import { ILoginResponse } from '@/interfaces';

type Data =
    | { message: string }
    | ILoginResponse

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return registerUser(req, res)

        default:
            return res.status(400).json({ message: 'No existe este endpoint' })
    }

}


const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', email = '', password = '' } = req.body as { email: string, password: string, name: string }

    email.toLowerCase()

    // validamos caractere de contraseña
    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener mas de 6 caracteres' })
    }

    // validamos caracteres de el name
    if (name.length < 2) {
        return res.status(400).json({ message: 'El nombre debe tener mas de 2 caracteres' })
    }

    // validamos el email
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'El correo no tiene el formato correcto' })
    }

    // validamos si existe un usuario con ese correo
    await db.connect()
    const user = await UserModel.findOne({ email })

    if (user) {
        await db.disconnect()
        return res.status(400).json({ message: 'Ya existe una cuenta registrada con ese correo' })
    }

    const newUser = new UserModel({ name, email, password: bcrypt.hashSync(password), status: true })

    try {
        await newUser.save({ validateBeforeSave: true })
    } catch (error) {
        return res.status(500).json({ message: 'Error al registrar usuario' })
    }

    await db.disconnect()

    const token = await createToken(newUser._id, email)

    return res.status(200).json({ token, user: { email, name } })
}