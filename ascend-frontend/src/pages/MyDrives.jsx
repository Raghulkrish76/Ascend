import { useState, useEffect } from "react"
import api from "../api"
import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
export function MyDrives() {
    const [myDrives, setMyDrives] = useState([])
    useEffect(() => {
        const fetchMyDrives = async () => {
            try {
                const response = await api.get('/api/mydrives')
                setMyDrives(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyDrives()
    }, [])
    return (
        <>
            <Navbar/>

            <h2>My Drives </h2>
            {myDrives.map((mydrive) => {
                return (
                    <div key={mydrive.id}>
                        <Link to = {`/jobs/${mydrive.job.id}`}>{mydrive.job.title} </Link>
                    </div>
                )

            })}
        </>
    )
}