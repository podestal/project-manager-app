import { privateAxios } from "../api/axios"
import { useEffect, useContext } from "react"
import useRefreshToken from './useRefreshToken'
import UserContext from "../context/UserProvider"
import dayjs from "dayjs"
import { jwtDecode } from "jwt-decode"

const usePrivateInterceptors = () => {
    const refresh = useRefreshToken()
    const { user } = useContext(UserContext)

    useEffect(() => {

        const requestIntercept = privateAxios.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `JWT ${user.accessToken}`
                }
                return config
            }, error => Promise.reject(error)
        )

        const responseIntercept = privateAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                const exp = jwtDecode(user.accessToken).exp
                const isExpired = dayjs.unix(exp).diff(dayjs()) < 1

                if (isExpired) {
                    const newAccessToken = await refresh()
                    console.log("new access token", newAccessToken)
                    prevRequest.headers['Authorization'] = `JWT ${newAccessToken}`
                    return privateAxios(prevRequest)
                }
                return Promise.reject(error)
            }
        )
        return () => {
            privateAxios.interceptors.response.eject(responseIntercept)
            privateAxios.interceptors.request.eject(requestIntercept)
        }

    }, [user, refresh])

    return privateAxios
}

export default usePrivateInterceptors