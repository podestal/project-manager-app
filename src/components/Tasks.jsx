import { getTasks, editTask } from "../api/axios"
import useUser from "../hooks/useUser"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Task from "./Task"
import TaskForm from "./TaskForm"
import "./styles.css"

const Tasks = () => {

    const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const { user } = useUser()
    const queryClient = useQueryClient()

    const {data: tasks, isLoading, isError, error} = useQuery({
        queryKey: ["tasks"],
        queryFn: () => getTasks(user.accessToken, id)
    })

    const {mutate: statusMutation} = useMutation({
        mutationFn: (data) => editTask(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] })
    })


    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error}</p>

    // NOT STARTED   //////////////

    const handleOnDragNotStarted = (e, task) => {
        e.dataTransfer.setData("task", JSON.stringify(task))
    }

    const handleOnDropNotStarted= e => {
        const task = JSON.parse(e.dataTransfer.getData("task"))
        const status = "N"
        if (task.status != status) {
            statusMutation({ projectId: id,  taskId: task.id, accessToken: user.accessToken, task: { ...task, status}})
        }
    }

    // IN PROGRESS   //////////////

    const handleOnDragInProgress = (e, task) => {
        e.dataTransfer.setData("task", JSON.stringify(task))
    }

    const handleOnDropInProgress= e => {
        const task = JSON.parse(e.dataTransfer.getData("task"))
        const status = "P"
        if (task.status != status) {
            statusMutation({ projectId: id,  taskId: task.id, accessToken: user.accessToken, task: { ...task, status}})
        }
    }

    // IN REVISION   //////////////

    const handleOnDragInRevision = (e, task) => {
        e.dataTransfer.setData("task", JSON.stringify(task))
    }

    const handleOnDropInRevision= e => {
        const task = JSON.parse(e.dataTransfer.getData("task"))
        const status = "R"
        if (task.status != status) {
            statusMutation({ projectId: id,  taskId: task.id, accessToken: user.accessToken, task: { ...task, status}})
        }
    }

    // COMPLETED   //////////////

    const handleOnDragCompleted = (e, task) => {
        e.dataTransfer.setData("task", JSON.stringify(task))
    }

    const handleOnDropCompleted= e => {
        const task = JSON.parse(e.dataTransfer.getData("task"))
        const status = "C"
        if (task.status != status) {
            statusMutation({ projectId: id,  taskId: task.id, accessToken: user.accessToken, task: { ...task, status}})
        }
    }



    const handleDragOver = e => {
        e.preventDefault()
    }

    return (
        <div>
            <TaskForm />
            <div className="tasks">
                <div>
                    <h3>Not Started</h3>
                    {tasks.data.filter(task => task.status == "N")
                    .map(task => (
                        <div
                            className='not-started'
                            draggable
                            onDragStart={e => handleOnDragNotStarted(e, task)}
                            onDrop={handleOnDropNotStarted}
                            onDragOver={handleDragOver}
                        >
                            <Task 
                                key={task.id}
                                task={task}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <h3>In Progress</h3>
                    {tasks.data.filter(task => task.status == "P")
                    .map(task => (
                        <div
                            className='in-progress'
                            draggable
                            onDragStart={e => handleOnDragInProgress(e, task)}
                            onDrop={handleOnDropInProgress}
                            onDragOver={handleDragOver}
                        >
                            <Task 
                                key={task.id}
                                task={task}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <h3>In Revision</h3>
                    {tasks.data.filter(task => task.status == "R")
                    .map(task => (
                        <div
                            className='in-revision'
                            draggable
                            onDragStart={e => handleOnDragInRevision(e, task)}
                            onDrop={handleOnDropInRevision}
                            onDragOver={handleDragOver}
                        >
                            <Task 
                                key={task.id}
                                task={task}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <h3>Completed</h3>
                    {tasks.data.filter(task => task.status == "C")
                    .map(task => (
                        <div
                            className='completed'
                            draggable
                            onDragStart={e => handleOnDragCompleted(e, task)}
                            onDrop={handleOnDropCompleted}
                            onDragOver={handleDragOver}
                        >
                            <Task 
                                key={task.id}
                                task={task}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tasks