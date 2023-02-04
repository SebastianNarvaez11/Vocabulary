import { ISeedWord, IWord } from "./word"

export interface ICategory {
    _id?: string,
    name: string,
    icon: string,
    user?: string,

    createdAt?: string,
    updatedAt?: string,

    words?: PointsWord[] //solo viene cuando hacemos el fetch de las categorias
}


interface PointsWord {
    points: number
}


export interface ISeedCategory {
    _id: string,
    name: string,
    icon: string,
    words : ISeedWord[]
}


export interface IResponseSeedCategoryWords {
    category : ICategory,
    words: IWord[]
}

export interface IResponseGetCategories {
    categories: ICategory[],
    easyWords: number
}