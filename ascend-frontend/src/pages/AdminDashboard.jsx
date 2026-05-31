import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import api from "../api"

export function AdminDashboard() {
    const [details, setDetails] = useState(null)
   useEffect(() => {
    const fetchdata = async () => {
        try {
            const response = await api.get("/api/admin/dashboard/")
            setDetails(response.data)
           
        } catch (error) {
             console.log(error)
        }
    }

    fetchdata()
}, [])
    if(!details){
        return <p>Loading</p>
    }

    return (
        <>
        <Navbar/>
         <p>AdminDahboard</p>
        <p>Total Students : {details.total_students}</p>
        <p>Total Drives: {details.total_drives}</p>
        <p>Total Drives Posted by Me : {details.total_mydrives}</p>
        
        {details.my_drives.map((mydrive)=>{
            return(
                <div key = {mydrive.id}>
                    <p><Link to = {`/jobs/${mydrive.id}`}> {mydrive.company_name}  </Link> </p>

                </div>
            )
        })}

        </>
    )
}