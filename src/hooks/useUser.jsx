import UserContext from "../context/UserProvider"
import { useContext } from "react"

const useUser = () => {
    return useContext(UserContext)
}

export default useUser