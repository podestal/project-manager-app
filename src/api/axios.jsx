import axios from "axios"

const BASE_URL = "http://127.0.0.1:8000"
const LOGIN_URL = '/auth/jwt/create/'
const USER_URL = '/auth/users/me'
const CREATE_USE_URL = '/auth/users/'
const REFRESH_TOKEN_URL = '/auth/jwt/refresh/'

const baseAxios = axios.create({
    baseURL: BASE_URL
})

export const privateAxios = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
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

export const createUser = async(username, email, password) => {
    return baseAxios.post(`${CREATE_USE_URL}`, ({
        username,
        email,
        password
    }))
}

export const getAccessToken = async (refreshToken) => {
    return baseAxios.post(`${REFRESH_TOKEN_URL}`), ({
        "refresh": refreshToken
    })
}

export default baseAxios