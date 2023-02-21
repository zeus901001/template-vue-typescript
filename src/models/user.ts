export interface IUser {
    _id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    permission: boolean,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number
}