import { db } from '@/database';
import { ICategory } from '@/interfaces';
import { CategoryModel, WordModel } from '@/models';
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

    console.log('cargando categorias');

    try {
        await db.connect()
        const categories = await CategoryModel.aggregate([
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
                // Utilizamos el operador $addFields para añadir un campo "wordCount" con la cantidad de palabras relacionadas
                $addFields: {
                    wordCount: { $size: "$words" }
                }
            },
            {
                // Utilizamos el operador $project para excluir los campos que no queremos en del resultado final
                $project: {
                    words: 0,
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0
                }
            }
        ]).exec()

        await db.disconnect()

        return res.status(200).json(categories)


    } catch (error) {
        return res.status(400).json({ message: 'ocurrio un error' })
    }
}