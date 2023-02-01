export interface IWord {
    _id?: string,
    spanish: string,
    english: string,
    image?: string,
    user: string,
    category: string,
    points: number
    current_review: number,
    next_review: number,

    createdAt?: string,
    updatedAt?: string
}