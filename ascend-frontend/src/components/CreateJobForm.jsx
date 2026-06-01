import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar"
import "../styles/CreateJob.css"


export function CreateJob() {

    const [title, setTitle] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [description, setDescription] = useState("")
    const [skills, setSkills] = useState("")
    const [stipend, setStipend] = useState("")
    const [salary, setSalary] = useState("")
    const [location, setLocation] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("company_name", companyName)
            formData.append("description", description)
            formData.append("skills_requires", skills)
            formData.append("stipend", stipend)
            formData.append("salary", salary)
            formData.append("location", location)

            await api.post("api/jobs/create/", formData)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <title>Ascend | Post a Job</title>

            <div className="cj-wrapper">
                <div className="cj-card">
                    <h1 className="cj-heading">Post a New Job</h1>
                    <p className="cj-subheading">Fill in the job details below</p>

                    <form>
                        <div className="cj-field">
                            <input
                                className="cj-input"
                                type="text"
                                placeholder="Job Title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="cj-field">
                            <input
                                className="cj-input"
                                type="text"
                                placeholder="Company Name"
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                        <div className="cj-field">
                            <textarea
                                className="cj-textarea"
                                placeholder="Job Description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="cj-field">
                            <input
                                className="cj-input"
                                type="text"
                                placeholder="Skills Required (comma separated, no spaces)"
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        </div>
                        <div className="cj-field">
                            <input
                                className="cj-input"
                                type="text"
                                placeholder="Stipend"
                                onChange={(e) => setStipend(e.target.value)}
                            />
                        </div>
                        <div className="cj-field">
                            <input
                                className="cj-input"
                                type="text"
                                placeholder="Salary"
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>
                        <div className="cj-field">
                            <input
                                className="cj-input"
                                type="text"
                                placeholder="Location"
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className="cj-submit-btn"
                            onClick={handleSubmit}
                        >
                            Post Job
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
