import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/'>Dashboard</Link>
            <Link to='/profile'>Profile</Link>
            <button>Logout</button>
        </div>
    )
}

export default Header