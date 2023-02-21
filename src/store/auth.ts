import jwtDecode from 'jwt-decode'
import { defineStore } from 'pinia'
import { IUser } from '../models/user';

let userInfo: IUser | null = null

const accessToken = localStorage.getItem('accessToken')
const refreshToken = localStorage.getItem('refreshToken')

if (accessToken && refreshToken) {
    try {
        const decodedToken: any = jwtDecode(accessToken)
        userInfo = decodedToken?.payload
    }
    catch (err) {
        console.log(err)
    }
}

export const useAuthStore = defineStore({
    id: 'authStore',
    state: () => {
        return { userInfo }
    },
    actions: {
        setUserInfo(aToken: string, rToken: string) {
            localStorage.setItem('accessToken', aToken)
            localStorage.setItem('refreshToken', rToken)

            const decodedToken: any = jwtDecode(aToken)
            this.userInfo = decodedToken?.payload
        },
        removeUserInfo() {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            this.userInfo = null
        }
    }
})