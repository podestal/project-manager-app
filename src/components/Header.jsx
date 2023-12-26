import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import UserContext from "../context/UserProvider"
import { useNavigate } from "react-router-dom"

const Header = () => {

    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()


    const handleLogout = () => {
        window.localStorage.removeItem("refreshToken")
        setUser({})
        navigate('/login')
    }

    return (
        <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/'>Dashboard</Link>
            <Link to='/profile'>Profile</Link>
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    )
}

export default Header