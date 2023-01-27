import { db } from '../../../database';
import {  createToken, getIdToken } from '../../../utils';
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserModel } from '../../../models';
import { ILoginResponse } from '../../../interfaces';

type Data =
    | { message: string }
    | ILoginResponse

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getCurrentUser(req, res)

        default:
            return res.status(400).json({ message: 'Este endpoint no existe' })
    }

}




const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { token = '' } = req.cookies

    let userId = await getIdToken(token)

    await db.connect()
    const user = await UserModel.findById(userId).lean()
    await db.disconnect()

    if (!user) {
        return res.status(400).json({ message: 'Token no es valido' })
    }

    if (!user.status) {
        return res.status(400).json({ message: 'Usuario bloqueado' })
    }

    const { _id, name, email, status } = user

    return res.status(200).json({
        token: await createToken(_id, email, status),
        user: {
            email,
            name
        }
    })
}