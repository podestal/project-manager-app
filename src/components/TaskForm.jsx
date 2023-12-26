import { useState } from "react"
import { createTask } from "../api/axios"
import useUser from "../hooks/useUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const TaskForm = () => {

    const [title, setTitle] = useState("")
    const {user} = useUser()
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const queryClient = useQueryClient()

    const {mutate: createMutation} = useMutation({
        mutationFn: (data) => createTask(data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["tasks"]}),
    })

    const handleSubmit = e => {
        e.preventDefault()
        createMutation({projectId: id, accessToken: user.accessToken, task: {title}})
        setTitle("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default TaskForm