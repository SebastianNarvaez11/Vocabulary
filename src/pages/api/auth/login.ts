import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { db } from '@/database';
import { UserModel } from '@/models';
import { createToken } from '@/utils';
import { ILoginResponse } from '@/interfaces';

type Data =
    | { message: string }
    | ILoginResponse

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return loginUser(req, res)

        default:
            return res.status(400).json({ message: 'Este endpoint no existe' })
    }

}



const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body

    await db.connect()
    const user = await UserModel.findOne({ email }).lean()
    await db.disconnect()

    if (!user) {
        return res.status(400).json({ message: 'Credenciales incorrectas' })
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return res.status(400).json({ message: 'Credenciales incorrectas' })
    }

    if (!user.status) {
        return res.status(400).json({ message: 'Usuario bloqueado, comuniquese con el administrador' })
    }


    const { _id, name } = user

    const token = await createToken(_id, email)

    return res.status(200).json({ token, user: { name, email } })
}