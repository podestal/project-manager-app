import { Link } from "react-router-dom"
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
        <header>
            {user ? 
                <div className="header-container">
                    <Link to='/'>Dashboard</Link>
                    <Link to='/profile'>Profile</Link>
                    <div>
                        <button onClick={() => handleLogout()}>Logout</button>
                    </div>
                </div>
                :
                <div className="header-container">
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
            }

        </header>
    )
}

export default Header