import { useContext } from "react"
import UserContext from "../context/UserProvider"
import { getProjects } from "../api/axios"
import { useQuery } from "@tanstack/react-query"
import ProjectSummary from "./ProjectSummary"
import CreateProject from "./CreateProject"

const Dashboard = () => {

    const {user} = useContext(UserContext)
    const {data: projects, isLoading, isError, error} = useQuery({
        queryKey: ["projects"],
        queryFn: () => getProjects(user.accessToken)
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

    return (
        <div>
            <h1>Dashboard</h1>
            <CreateProject />
            {projects.data.map(project => (
                <ProjectSummary 
                    key={project.id}
                    project={project}
                    accessToken={user.accessToken}
                />
            ))}
        </div>
    )
}

export default Dashboard