import baseAxios from "../api/axios"
import { useContext } from "react"
import UserContext from "../context/UserProvider"

const useRefreshToken = () => {
    const { user, setUser } = useContext(UserContext)
    const refresh = async () => {
        const refreshToken = JSON.parse(window.localStorage.getItem("refreshToken"))
        const tokenResponse = await baseAxios.post('/auth/jwt/refresh/', 
            ({
                "refresh": refreshToken
            })
        )
        const newAccessToken = tokenResponse.data.access
        setUser(prev => ({...prev, accessToken: newAccessToken}))
        return newAccessToken
    }
    return refresh
}

export default useRefreshToken
