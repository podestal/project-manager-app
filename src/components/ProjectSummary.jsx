import { Link } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProject } from "../api/axios"

const ProjectSummary = ({ project, accessToken }) => {

    const queryClient = useQueryClient()

    const {mutate: deleteMutation} = useMutation({
        mutationFn: () => deleteProject(accessToken, project.id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["projects"]})
    })

    const handleDelete = () => {
        deleteMutation()
    }

    return (
        <div>
            <Link to={`/project/${project.id}`}>{project.title}</Link>
            <p>{project.description}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default ProjectSummary