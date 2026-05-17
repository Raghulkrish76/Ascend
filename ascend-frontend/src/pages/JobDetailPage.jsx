
import { useEffect, useState } from "react"
import api from "../api"
import { useParams } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
export function JobDetailPage() {
    const [jobDetail, setJobDetail] = useState([])


    const [title, setTitle] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [description, setDescription] = useState("")
    const [skills, setSkills] = useState("")
    const [stipend, setStipend] = useState("")
    const [salary, setSalary] = useState("")
    const [location, setLocation] = useState("")

    const [editMode, setEditMode] = useState(false)
    const { isAdmin } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        api.get(`/api/jobs/${id}`)
            .then((response) => {
                setJobDetail(response.data)
            })
    }, [id])


    const handleDelete = async () => {
        try {
            await api.delete(`/api/jobs/delete/${id}/`)
            alert("Job post deleted successfully ")
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    const startEdit = () => {
        setTitle(jobDetail.title)
        setCompanyName(jobDetail.company_name)
        setDescription(jobDetail.description)
        setSkills(jobDetail.skills_requires)
        setStipend(jobDetail.stipend)
        setSalary(jobDetail.salary)
        setLocation(jobDetail.location)
        setEditMode(true)
    }

    const handleUpdate = async () => {
        const data = {

            title: title,
            company_name: companyName,
            description: description,
            skills_requires: skills,
            salary: salary,
            stipend: stipend,
            location: location
        }
        try {
            await api.patch(`/api/jobs/update/${id}/`, data)
            alert("Job post updated successfully")

            const response = await api.get(`/api/jobs/${id}`)
            setJobDetail(response.data)
            setEditMode(false)

        } catch (error) {
            console.log(error)
        }
    }




    return (
        <>
            <>
                <h1>{jobDetail.title}</h1>

                <p>{jobDetail.company_name}</p>

                <p>{jobDetail.description}</p>

                <p>{jobDetail.skills_requires}</p>

                <p>{jobDetail.stipend}</p>

                <p>{jobDetail.salary}</p>

                <p>{jobDetail.location}</p>
            </>

            {isAdmin && (
                <>
                    <button onClick={handleDelete}>Delete job post </button>
                    <button onClick={startEdit}>Update Job post </button>
                    {editMode && (
                        <>
                            <input
                                type="text"
                                placeholder="Job Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Company Name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />

                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Skills"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Stipend"
                                value={stipend}
                                onChange={(e) => setStipend(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />

                            <button onClick={handleUpdate}>
                                Save Update
                            </button>
                        </>

                    )}

                </>
            )}
        </>
    )
}