export interface IUser {
    _id?: string,
    name: string,
    email: string,
    password?: string,
    status: boolean,

    createdAt?: string,
    updatedAt?: string
}

