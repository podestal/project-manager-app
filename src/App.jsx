import Register from "./components/Register"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Profile from "./components/Profile"
import Header from "./components/Header"
import RequireAuth from "./components/RequireAuth"
import PersistLogin from "./components/PersistLogin"
import { Routes, Route } from "react-router-dom"
import Project from "./components/Project"

const App = () => {


  return (
    <div className="main">
      <Header />
      <Routes>
        {/* Free routes */}
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="" element={<Dashboard />}/>
            <Route path="profile" element={<Profile />}/>
            <Route path="project/:id" element={<Project />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
