import { useState } from "react"
import { editTask, deleteTask } from "../api/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useUser from "../hooks/useUser"

const Task = ({ task }) => {

    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(task.title)
    const projectId = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const {user} = useUser()
    const queryClient = useQueryClient()
    const { mutate: editMutation } = useMutation({
        mutationFn: (data) => editTask(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] })
    })

    const { mutate: deleteMutation} = useMutation({
        mutationFn: (data) => deleteTask(data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["tasks"]})
    })

    const handleEdit = e => {
        e.preventDefault()
        editMutation({ projectId, taskId: task.id, accessToken: user.accessToken, task: { ...task, title} })
        setEdit(prev => !prev)
    }

    const handleDelete = () => {
        deleteMutation({ projectId, taskId: task.id, accessToken: user.accessToken })
    }

    return (
        <div>
            {edit 
            ? <form onSubmit={handleEdit}>
                <input 
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <br />
                <button>Update</button>
              </form>
            : <div

               >
                <h3>{task.title}</h3>
                <p>{task.status}</p>
                <button onClick={() => setEdit(prev => !prev)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div> 
            }
        </div>
    )
}

export default Task