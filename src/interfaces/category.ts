export interface ICategory {
    _id?: string,
    name: string,
    icon: string,
    user: string,

    createdAt?: string,
    updatedAt?: string,

    words? : PointsWord[] //solo viene cuando hacemos el fetch de las categorias
}


interface PointsWord {
    points : number
}