import { defineStore } from 'pinia'
import { IUser } from '../models/user'

const data = [] as IUser[]
const model = null as IUser | null

export const useUsersStore = defineStore({
    id: 'usersStore',
    state: () => {
        return { data, model }
    },
    actions: {
        findAll(payload: Array<IUser>) {
            this.data = payload
        },
        findById(payload: IUser) {
            this.model = payload
        },
        updateById(payload: IUser) {
            this.model = null
            this.data.map(item => item._id === payload._id ? payload : item)
        },
        removeById(payload: IUser) {
            this.data = this.data.filter(item => item._id !== payload._id)
        }
    }
})