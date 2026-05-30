import { useEffect, useState, } from "react"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import api from "../api"

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
     const {isAdmin} = useAuth()

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
    useEffect(()=>{
        if (isAdmin){
            navigate("/")
        }
    })
    return (
        <>
            <Navbar/>
            <form>
                <input
                    type="text"
                    placeholder="Student Name"
                    onChange={(e) => setStudentName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Batch"
                    onChange={(e) => setBatch(e.target.value)}
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                />


                <select
                    name="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >

                    <option value="">Select Department</option>
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="EEE">Electrical & Electronics</option>
                    <option value="MECH">Mechanical Engineering</option>
                    <option value="CIVIL">Civil Engineering</option>
                    <option value="IT">Information Technology</option>
                    <option value="AIDS">AI & Data Science</option>
                    <option value="AIML">AI & Machine Learning</option>

                </select>

                <input
                    type="number"
                    placeholder="CGPA"
                    step="0.01" min="0" max="10"
                    onChange={(e) => setCgpa(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Skills Type the values in comma seprated values without space"
                    onChange={(e) => setSkills(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Year of Study" min="1" max="4"
                    onChange={(e) => setYear(e.target.value)}
                />
                <input
                    type="file"
                    placeholder="Upload Resume"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files[0])}
                />
                <button type = "submit" onClick={handleSubmit}>Submit Student Details </button>
            </form>

        </>
    )
}