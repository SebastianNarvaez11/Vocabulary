import { db } from '@/database'
import { IWord } from '@/interfaces'
import { WordModel } from '@/models'
import { isValidObjectId } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IWord

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'PUT':
            return updateWord(req, res)

        default:
            return res.status(400).json({ message: 'Este endpoint no existe' })
    }

}


const updateWord = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query as { id: string }
    const { points } = req.body

    if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'No es una palabra valida' })
    }

    // TODO:  calcular la fecha de la proxima review
    
    try {
        await db.connect()
        const word = await WordModel.findByIdAndUpdate(id, { points, current_review: Date.now(), next_review : Date.now() }, { runValidators: true, new: true })
        await db.disconnect()

        return res.status(200).json(word!)

    } catch (error) {
        await db.disconnect()
        return res.status(400).json({ message: 'No existe esa palabra' })
    }

}