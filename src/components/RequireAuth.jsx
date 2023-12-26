import UserContext from "../context/UserProvider"
import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"

const RequireAuth = () => {

    const { user } = useContext(UserContext)

    return (
        user?.accessToken
        ? <Outlet />
        : <Navigate to={'/login'}/>
    )
}

export default RequireAuth