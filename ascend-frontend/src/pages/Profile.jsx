import { useEffect, useState } from "react"
import api from "../api"

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

            {student.studentname}
            {student.department}

        </>
    )
}