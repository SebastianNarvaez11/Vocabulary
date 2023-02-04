import { db, existUserById } from '@/database'
import { IWord } from '@/interfaces'
import { WordModel } from '@/models'
import { disorderWords, getIdToken } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IWord[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const _id = await getIdToken(req.cookies.token!)
    const existUser = await existUserById(_id)

    if (!existUser) {
        return res.status(400).json({ message: 'No existe usuario en token' })
    }

    try {
        await db.connect()
        const words = await WordModel.find({ user: _id, points: 2 }).select('english spanish image points').sort({ current_review: 1 })
        await db.disconnect()

        const wordsSelected = disorderWords(words.slice(0, 19))

        return res.status(200).json(wordsSelected)
    } catch (error) {
        await db.disconnect()
        return res.status(500).json({ message: 'ocurrio un error' })
    }
}