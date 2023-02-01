import type { NextApiRequest, NextApiResponse } from 'next'
import { db, initialData } from '../../database'
import { UserModel } from '@/models'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  try {
    await db.connect()

    await UserModel.deleteMany()
    await UserModel.insertMany(initialData.users)
    
    await db.disconnect()

    res.status(200).json({ message: 'Datos semilla registrados' })

  } catch (error) {
    await db.disconnect()
    console.log(error);
    res.status(500).json({ message: 'Ocurrio un error' })
  }
}