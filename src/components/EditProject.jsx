import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editProject } from "../api/axios"

const EditProject = ({ project, accessToken, setEdit }) => {

    const [title, setTitle] = useState(project.title)
    const [description, setDescription] = useState(project.description)
    const queryClient = useQueryClient()

    const { mutate: updateMutation } = useMutation({
        mutationFn: () => editProject(accessToken, project.id, { ...project, title, description }),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["project"]})
    })

    const handleUpdate = e => {
        e.preventDefault()
        try {
            updateMutation()
            setEdit(prev => !prev)
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <div>
            {/* <ProjectForm 
                mutation={updateMutation}
                project={project}
            /> */}
            <form onSubmit={handleUpdate}>
                <input 
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <br />
                <input 
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProject

