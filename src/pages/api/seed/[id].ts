import type { NextApiRequest, NextApiResponse } from 'next'
import { db, existUserById } from '@/database'
import { initialData } from '../../../database/seed'
import { CategoryModel, WordModel } from '@/models'
import { disorderWords, getIdToken } from '@/utils'
import { IResponseSeedCategoryWords, IWord } from '@/interfaces'

type Data =
    | { message: string }
    | IResponseSeedCategoryWords


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query as { id: string }
    const user = await getIdToken(req.cookies.token!)


    if(! await existUserById(user)){                                                                  //validamos si exist el usuario en el token
        return res.status(400).json({ message: 'Token no valido' })   
    }


    const category = initialData.categories.find(category => category._id === id)

    if (!category) {
        return res.status(400).json({ message: 'No existe ninguna categoria con ese id' })            //validamos que la categoria exista en el archivo seed
    }


    const { icon, name, words } = category

    await db.connect()
    const existCategory = await CategoryModel.findOne({ name, user }).lean()
    await db.disconnect()

    if (existCategory) {
        return res.status(400).json({ message: 'Esta categoria ya esta creada para el usuario' })    //validamos que el usuario no tenga esa categoria creada ya
    }


    try {

        const newCategory = new CategoryModel({ name, icon, user })                                   //creamos la categoria en la bd

        await db.connect()
        await newCategory.save({ validateBeforeSave: true })
        await db.disconnect()

        const wordsToCreate: IWord[] = words.map(word => {                                           //le añadimos el user y la category a cada palabra que viene del array del seed
            return { ...word, user, category: newCategory._id }
        })

        await db.connect()
        const wordsCreated = await WordModel.insertMany(wordsToCreate)                               //creamos las palabras en la bd
        await db.disconnect()      
                                 
        const wordsCreatedSelect: IWord[] = disorderWords(wordsCreated).splice(0, 9).map(word => {                  //seleccionamos 10 palabras y sleccionamos los campos que necesitamos de cada palabra
            return {
                _id: word._id,
                english: word.english,
                spanish: word.spanish,
                image: word.image,
                points: word.points
            }
        })

        
        return res.status(200).json({ category: newCategory, words: wordsCreatedSelect})

    } catch (error) {
        await db.disconnect()
        return res.status(500).json({ message: 'Error al crear la categoria' })
    }
}
