import { useState } from "react"
import useUser from "../hooks/useUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProject } from "../api/axios"

const CreateProject = () => {

    const queryClient = useQueryClient()
    const { user } = useUser()
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [description, setDescription] = useState("")

    const {mutate: createMutation, error} = useMutation({
        mutationFn: () => createProject(user.accessToken, {title, slug, description}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["projects"]})
    })

    const handleCreate = e => {
        e.preventDefault()
        createMutation()
        // console.log(user.accessToken);
        // console.log({ title, slug, description, user: user.id});
        // try {
        //     
        // } catch (err) {
        //     console.log(err)
        // }

        // await createProject(user.accessToken, {title, slug, description })
    }

    return (
        <form onSubmit={handleCreate}>
            <input 
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <br />
            <input 
                type="text"
                placeholder="Slug"
                value={slug}
                onChange={e => setSlug(e.target.value)}
            />
            <br />
            <input 
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <br />
            <button type="submit">Save</button>
        </form>
    )
}

export default CreateProject