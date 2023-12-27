import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import UserContext from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import useUser from "../hooks/useUser"

const Header = () => {

    const {user, setUser} = useUser()
    const navigate = useNavigate()


    const handleLogout = () => {
        window.localStorage.removeItem("refreshToken")
        setUser()
        navigate('/login')
    }

    return (
        <div>
            {user ? 
                <div>
                    <Link to='/'>Dashboard</Link>
                    <Link to='/profile'>Profile</Link>
                    <button onClick={() => handleLogout()}>Logout</button>
                </div>
                :
                <div>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
            }

        </div>
    )
}

export default Header