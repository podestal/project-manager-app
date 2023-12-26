const ProjectForm = ({ mutation, project }) => {

    const [title, setTitle] = useState(project.title || "")
    const [description, setDescription] = useState(project.description || "")


    const handleUpdate = e => {
        e.preventDefault()
        try {
            mutation()
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
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

export default ProjectForm