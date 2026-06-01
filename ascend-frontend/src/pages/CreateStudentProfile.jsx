import { useEffect, useState, } from "react"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import api from "../api"
import "../styles/CreateStudentProfile.css"

export function CreateStudentProfile() {
    const [studentName, setStudentName] = useState("")
    const [batch, setBatch] = useState("")
    const [phone, setPhone] = useState("")
    const [department, setDepartment] = useState("")
    const [cgpa, setCgpa] = useState("")
    const [skills, setSkills] = useState("")
    const [year, setYear] = useState("")
    const [resume, setResume] = useState("")
    const navigate = useNavigate()
    const { isAdmin } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("studentname", studentName)
        formData.append("batch", batch)
        formData.append("phone", phone)
        formData.append("department", department)
        formData.append("cgpa", cgpa)
        formData.append("skills", skills)
        formData.append("year_of_study", year)
        if (resume) formData.append("resume", resume)
        try {
            await api.post("/api/studentprofile/create/", formData)
            alert("Sucessfully created ")
            navigate("/")
        } catch (error) {
            console.log(error)
            alert("Error in submitting details")
        }
    }

    useEffect(() => {
        if (isAdmin) {
            navigate("/")
        }
    })

    return (
        <>
            <Navbar />
            <title>Ascend | Create Profile</title>

            <div className="csp-wrapper">
                <div className="csp-card">
                    <h1 className="csp-heading">Create Your Profile</h1>
                    <p className="csp-subheading">Fill in your details to get started</p>

                    <form onSubmit={handleSubmit}>
                        <div className="csp-field">
                            <input
                                className="csp-input"
                                type="text"
                                placeholder="Student Name"
                                onChange={(e) => setStudentName(e.target.value)}
                            />
                        </div>
                        <div className="csp-field">
                            <input
                                className="csp-input"
                                type="text"
                                placeholder="Batch (e.g. 2024)"
                                onChange={(e) => setBatch(e.target.value)}
                            />
                        </div>
                        <div className="csp-field">
                            <input
                                className="csp-input"
                                type="tel"
                                placeholder="Phone Number"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="csp-field">
                            <select
                                className="csp-select"
                                name="department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value="">Select Department</option>
                                <option value="CSE">Computer Science &amp; Engineering</option>
                                <option value="ECE">Electronics &amp; Communication</option>
                                <option value="EEE">Electrical &amp; Electronics</option>
                                <option value="MECH">Mechanical Engineering</option>
                                <option value="CIVIL">Civil Engineering</option>
                                <option value="IT">Information Technology</option>
                                <option value="AIDS">AI &amp; Data Science</option>
                                <option value="AIML">AI &amp; Machine Learning</option>
                            </select>
                        </div>
                        <div className="csp-field">
                            <input
                                className="csp-input"
                                type="number"
                                placeholder="CGPA (0 - 10)"
                                step="0.01" min="0" max="10"
                                onChange={(e) => setCgpa(e.target.value)}
                            />
                        </div>
                        <div className="csp-field">
                            <input
                                className="csp-input"
                                type="text"
                                placeholder="Skills (comma separated, e.g. Python,React)"
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        </div>
                        <div className="csp-field">
                            <input
                                className="csp-input"
                                type="number"
                                placeholder="Year of Study (1 - 4)"
                                min="1" max="4"
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </div>
                        <div className="csp-field">
                            <input
                                className="csp-input"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setResume(e.target.files[0])}
                            />
                        </div>

                        <button type="submit" className="csp-submit-btn">
                            Submit Student Details
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}