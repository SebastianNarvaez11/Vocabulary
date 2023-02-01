import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { IWord } from '@/interfaces'
import { CategoryModel, WordModel } from '@/models'
import { getIdToken, selectIdealWords } from '@/utils'
import { isValidObjectId } from 'mongoose'

type Data =
    | { message: string }
    | IWord[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { category } = req.query as { category: string } //categori id
    const user = await getIdToken(req.cookies.token!) //user id

    if(!isValidObjectId(category)){
        res.status(400).json({ message: 'No es una categoria valida' })
    }

    await db.connect()
    const existCategory = await CategoryModel.findById(category).lean()
    await db.disconnect()

    if(!existCategory){
        res.status(400).json({ message: 'No existe esa categoria' })
    }


    try {
        await db.connect()
        const words = await WordModel.find({ user, category })          //filtramos las palabras que sean de ese usuario y esa categoria
            .select('english spanish image points current_review next_review').lean()

        await db.disconnect()

        res.status(200).json(selectIdealWords(words))
    } catch (error) {
        await db.disconnect()
        res.status(500).json({ message: 'Ocurrio un error' })
    }

}


