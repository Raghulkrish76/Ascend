import { useEffect, useState } from "react"
import api from "../api"
import { Navbar } from "../components/Navbar"
import "../styles/StudentProfile.css"

export function Profile() {
    const [student, setStudent] = useState(null)

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await api.get("/api/studentprofile/")
                setStudent(response.data)
            } catch (error) {
                console.log(error.response.data)
                alert("Error in loading the profile ")
            }
        }
        fetchStudentDetails()
    }, [])

    if (!student) return <p>Loading...</p>

    return (
        <>
            <Navbar />
            <title>Ascend | Student Profile</title>

            <div className="profile-wrapper">
                <div className="profile-card">

                    {/* Avatar */}
                    <div className="profile-avatar">
                        {student.studentname ? student.studentname.charAt(0).toUpperCase() : "?"}
                    </div>

                    {/* Name & Department */}
                    <h1 className="profile-name">{student.studentname}</h1>
                    <p className="profile-department-tag">{student.department}</p>

                    <hr className="profile-divider" />

                    {/* Details */}
                    <div className="profile-details">

                        <div className="profile-field">
                            <span className="profile-field-label">Phone</span>
                            <span className="profile-field-value">{student.phone}</span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-field-label">Year of Study</span>
                            <span className="profile-field-value">{student.year_of_study}</span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-field-label">Batch</span>
                            <span className="profile-field-value">{student.batch}</span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-field-label">CGPA</span>
                            <span className="profile-field-value">{student.cgpa}</span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-field-label">Skills</span>
                            <div className="profile-skills-list">
                                {student.skills
                                    ? student.skills.split(",").map((skill, index) => (
                                        <span className="profile-skill-tag" key={index}>
                                            {skill.trim()}
                                        </span>
                                    ))
                                    : <span className="profile-field-value">—</span>
                                }
                            </div>
                        </div>

                    </div>

                    {/* Dummy update button — UI only */}
                    <button className="profile-update-btn">Update My Profile</button>

                </div>
            </div>
        </>
    )
}