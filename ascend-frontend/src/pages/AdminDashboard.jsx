import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import api from "../api"
import "../styles/AdminDashboard.css"

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

    if (!details) {
        return <p>Loading</p>
    }

    return (
        <>
            <title>Ascend | Admin Dashboard</title>
            <Navbar />

            <div className="admin-wrapper">

                {/* Page Heading */}
                <h1 className="admin-heading">Admin Dashboard</h1>
                <p className="admin-subheading">Overview of placement activity</p>

                {/* Stats Row */}
                <div className="admin-stats-row">
                    <div className="admin-stat-card">
                        <span className="admin-stat-count">{details.total_students}</span>
                        <span className="admin-stat-label">Total Students</span>
                    </div>
                    <div className="admin-stat-card">
                        <span className="admin-stat-count">{details.total_drives}</span>
                        <span className="admin-stat-label">Total Drives</span>
                    </div>
                    <div className="admin-stat-card">
                        <span className="admin-stat-count">{details.total_mydrives}</span>
                        <span className="admin-stat-label">My Drives</span>
                    </div>
                </div>

                {/* My Drives Job Cards */}
                <h2 className="admin-section-title">My Posted Drives</h2>
                <div className="admin-jobs-list">
                    {details.my_drives.map((mydrive) => (
                        <div className="admin-job-card" key={mydrive.id}>

                            {/* Company avatar */}
                            <div className="admin-job-avatar">
                                {mydrive.company_name ? mydrive.company_name.charAt(0).toUpperCase() : "?"}
                            </div>

                            {/* Card body */}
                            <div className="admin-job-body">
                                <Link to={`/jobs/${mydrive.id}`} className="admin-job-title">
                                    {mydrive.title}
                                </Link>
                                <span className="admin-job-company">{mydrive.company_name}</span>
                                <p className="admin-job-desc">{mydrive.description}</p>

                                {/* Meta row */}
                                <div className="admin-job-meta-row">
                                    <div className="admin-meta-item">
                                        <span className="admin-meta-label">Stipend</span>
                                        <span className="admin-meta-value">{mydrive.stipend}</span>
                                    </div>
                                    <div className="admin-meta-divider"></div>
                                    <div className="admin-meta-item">
                                        <span className="admin-meta-label">Salary</span>
                                        <span className="admin-meta-value">{mydrive.salary}</span>
                                    </div>
                                    <div className="admin-meta-divider"></div>
                                    <div className="admin-meta-item">
                                        <span className="admin-meta-label">Location</span>
                                        <span className="admin-meta-value">{mydrive.location}</span>
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