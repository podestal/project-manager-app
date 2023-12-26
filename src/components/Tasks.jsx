import { useEffect, useState } from "react"
import { getTasks } from "../api/axios"
import useUser from "../hooks/useUser"
import { useQuery } from "@tanstack/react-query"

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
            {tasks && tasks.data.map(task => (
                <div key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.status}</p>
                </div>
            ))}
        </div>
    )
}

export default Tasks