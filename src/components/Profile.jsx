import baseAxios from "../api/axios"
import UserContext from "../context/UserProvider"
import { useEffect, useContext, useState } from "react"
import usePrivateInterceptors from "../hooks/usePrivateInterceptors"

const Profile = () => {

    const {user} = useContext(UserContext)
    const privateInterceptors = usePrivateInterceptors()

    

    return (
        <div>
            <h1>Profile</h1>
            {user && 
                <div>
                    <h3>Username: {user.username}</h3>
                    <p>Email: {user.email}</p>
                    <p>Id: {user.id}</p>
                </div>}
        </div>
    )
}

export default Profile