import { useState, useContext, useEffect } from "react"
import {getTokens, getUser} from "../api/axios"
import UserContext from "../context/UserProvider"
import { Link, useNavigate, useLocation } from "react-router-dom"

const Login = () => {

    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || '/'

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const jwtResponse = await getTokens(username, password)
            const {access: accessToken, refresh: refreshToken} = jwtResponse.data
    
            const userResponse = await getUser(accessToken)
            const {id, email } = userResponse.data
            window.localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
            setUser({ id, email, username, accessToken, refreshToken})
            setError("")
            setUsername("")
            setPassword("")
            navigate(from, { replace: true })
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button>Login</button>
            </form> 
            <span>Does not have an account? </span>
            <Link to={'/register'}>Signup</Link>
        </div>
    )
}

export default Login