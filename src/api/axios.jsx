import axios from "axios"

const BASE_URL = "http://127.0.0.1:8000"
const LOGIN_URL = '/auth/jwt/create/'
const USER_URL = '/auth/users/me'

const baseAxios = axios.create({
    baseURL: BASE_URL
})

export const getTokens = async (username, password) => {
    return baseAxios.post(`${LOGIN_URL}`, ({
        username,
        password
    }))
}

export const getUser = async(accessToken) => {
    return baseAxios.get(`${USER_URL}`, {
        headers: {Authorization: `JWT ${accessToken}`}
    })
}

export default baseAxios