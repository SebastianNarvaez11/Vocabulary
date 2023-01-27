export interface ICategory {
    _id?: string,
    name: string,
    icon: string,

    createdAt?: string,
    updatedAt?: string,

    wordCount? : number //solo viene cuando hacemos la consulta 
}
