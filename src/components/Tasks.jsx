import { getTasks } from "../api/axios"
import useUser from "../hooks/useUser"
import { useQuery } from "@tanstack/react-query"
import Task from "./Task"
import TaskForm from "./TaskForm"

const Tasks = () => {

    const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const { user } = useUser()

    const {data: tasks, isLoading, isError, error} = useQuery({
        queryKey: ["tasks"],
        queryFn: () => getTasks(user.accessToken, id)
    })


    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error}</p>

    return (
        <div>

            <TaskForm />
            {tasks && tasks.data.map(task => (
                <Task 
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    )
}

export default Tasks