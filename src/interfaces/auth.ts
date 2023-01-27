export interface ILoginResponse {
    token: string,
    user: IUserLogin
}


export interface IUserLogin {
    name: string,
    email: string
}