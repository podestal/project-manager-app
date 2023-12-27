import useUser from "../hooks/useUser"
import { getProject, editProject} from "../api/axios"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useState } from "react"
import EditProject from "./EditProject"
import Tasks from "./Tasks"

const Project = () => {

    const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const { user } = useUser()
    const { data: project, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ["project"],
        queryFn: () => getProject(user.accessToken, id)
    })

    const [edit, setEdit] = useState(false)

    if (isLoading) return <p>Loading ....</p>

    if (isError) return <p>{error.message}</p>



    return (
        <div>
            {edit 
            ? 
            <EditProject 
                project={project.data}
                accessToken={user.accessToken}
                setEdit={setEdit}
            />
            :             
            <div>
                <h3 className="project-title">{project.data.title}</h3>
                <button onClick={() => setEdit(prev => !prev)}>Edit</button>
            </div>}
            <Tasks 
                id={project.data.id}
            />
        </div>
    )
}

export default Project