import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "../api/axios"
import { createUser } from "../api/axios"

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPwd, setVerifyPwd] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        if (password === verifyPwd) {
            try {
                await createUser(username, email, password)
                setSuccess("You are successfully registered")
            } catch (err) {
                setError(err.message)
            }
            setUsername("")
            setEmail("")
            setPassword("")
            setVerifyPwd("")
            setError("")
        } else {
            setError("Passowrds do not match")
        }
    }

    return (
        <div>
            <h2>Register</h2>
            {error ? <p>{error}</p> : <p>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Re Password"
                    value={verifyPwd}
                    onChange={e => setVerifyPwd(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            <span>Already have an account</span>
            <Link to={'/login'}>Login</Link>
        </div>
    )
}

export default Register