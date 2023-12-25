import { useState } from "react"
import axios from "../api/axios"

const CREATE_USE_URL = '/auth/users/'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPwd, setVerifyPwd] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        if (password === verifyPwd) {
            axios.post(CREATE_USE_URL, ({
                username,
                email,
                password
            }))
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
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
            {error && <p>{error}</p>}
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
        </div>
    )
}

export default Register