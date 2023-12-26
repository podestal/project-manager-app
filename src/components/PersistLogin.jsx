import { Outlet } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import UserContext from "../context/UserProvider"
import { getUser } from "../api/axios"

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true)
    const { user, setUser } = useContext(UserContext)
    const refresh = useRefreshToken()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
                const response = await getUser(user.accessToken)
                const {username, id, email} = response.data
                setUser(prev => ({...prev, username, id, email}))
                console.log("user from persist", user)
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        !user?.username ? verifyRefreshToken() : setIsLoading(false)
    }, [user])

    return (
        <div>
            {isLoading
            ? <p>Loading ...</p>
            : <Outlet />
        }
        </div>
    )
}

export default PersistLogin