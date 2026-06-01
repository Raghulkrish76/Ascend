import { useState, useEffect } from "react"
import api from "../api"
import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import "../styles/MyDrives.css"

export function MyDrives() {
    const [myDrives, setMyDrives] = useState([])

    useEffect(() => {
        const fetchMyDrives = async () => {
            try {
                const response = await api.get('/api/mydrives')
                setMyDrives(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyDrives()
    }, [])

    return (
        <>
            <Navbar />
            <title>Ascend | My Drives</title>

            <div className="mydrives-wrapper">
                <h1 className="mydrives-heading">My Drives</h1>
                <p className="mydrives-subheading">Drives you have applied or been added to</p>

                {myDrives.length === 0 && (
                    <p className="mydrives-empty">No drives found.</p>
                )}

                <div className="mydrives-list">
                    {myDrives.map((mydrive) => (
                        <div className="mydrive-card" key={mydrive.id}>

                            {/* Company letter avatar */}
                            <div className="mydrive-avatar">
                                {mydrive.job.title ? mydrive.job.title.charAt(0).toUpperCase() : "?"}
                            </div>

                            {/* Card body */}
                            <div className="mydrive-body">
                                <Link to={`/jobs/${mydrive.job.id}`} className="mydrive-title">
                                    {mydrive.job.title}
                                </Link>
                                

                                {/* Meta row */}
                                <div className="mydrive-meta-row">
                                    <div className="mydrive-meta-item">
                                        <span className="mydrive-meta-label">Stipend</span>
                                        <span className="mydrive-meta-value">{mydrive.job.stipend}</span>
                                    </div>
                                    <div className="mydrive-meta-divider"></div>
                                    <div className="mydrive-meta-item">
                                        <span className="mydrive-meta-label">Salary</span>
                                        <span className="mydrive-meta-value">{mydrive.job.salary}</span>
                                    </div>
                                    <div className="mydrive-meta-divider"></div>
                                    <div className="mydrive-meta-item">
                                        <span className="mydrive-meta-label">Location</span>
                                        <span className="mydrive-meta-value">{mydrive.job.location}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}