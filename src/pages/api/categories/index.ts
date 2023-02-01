import mongoose from 'mongoose';
import { db } from '@/database';
import { ICategory } from '@/interfaces';
import { CategoryModel, WordModel } from '@/models';
import { getIdToken } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | ICategory[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getCategories(req, res)

        default:
            return res.status(400).json({ message: 'No existe este endpoint' })
    }
}


const getCategories = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const user_id = await getIdToken(req.cookies.token!)

    try {
        await db.connect()
        const categories = await CategoryModel.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(user_id) }//filtramos solo las categorias del usuario
            },
            {
                // Utilizamos el operador $lookup para hacer un "join" entre las colecciones de categories y words
                $lookup: {
                    from: 'words', // Nombre de la colección a unir
                    localField: "_id", // Campo de la colección actual para hacer la unión
                    foreignField: "category", // Campo de la otra colección para hacer la unión
                    as: "words" // Nombre del campo en el que se guardarán las palabras relacionadas
                }
            },
            {
                // Utilizamos el operador $project para excluir los campos que no queremos en el resultado final
                $project: {
                    words: { points: 1 },
                    name: 1,
                    icon: 1
                }
            }
        ]).exec()

        await db.disconnect()

        return res.status(200).json(categories)


    } catch (error) {
        console.log(error);
        await db.disconnect()
        return res.status(400).json({ message: 'ocurrio un error' })
    }
}