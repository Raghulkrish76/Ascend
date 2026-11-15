import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import api from "../api"
import useAuth from "../hooks/useAuth"
import "../styles/Home.css"

export function Home() {
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()
  const { isAdmin } = useAuth()

  useEffect(() => {
    api.get("/api/jobs/")
      .then((response) => {
        console.log([response.data,...jobs])
        setJobs(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return ( 
    <>
      <title>Ascend | Home</title>
      <Navbar />

      <div className="home-wrapper">

        {/* Hero Section */}
        <div className="home-hero">
          <div className="home-hero-text">
            <h1 className="home-hero-title">Find Your Next Opportunity</h1>
            <p className="home-hero-subtitle">
              Browse the latest placement drives — all in one place.
            </p>
          </div>

          <div className="home-hero-actions">
            {!isAdmin && (
             
                <Link to = "/profile"  className="btn btn-outline">
                View Student Profile
                </Link>
          
            )}
            {isAdmin && (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/jobs/create/")}
              >
                + Post a Job
              </button>
            )}
          </div>
        </div>

        {/* Job Listings */}
        <div className="jobs-section">
                   
           <h2 className="jobs-section-title">Active Drives</h2>
          <div className="jobs-list">
            {jobs.map((job) => (
              <div className="job-card" key={job.id}>

                {/* Left: Company initial avatar */}
                <div className="job-card-avatar">
                  {job.company_name ? job.company_name.charAt(0).toUpperCase() : "?"}
                </div>

                {/* Center: Main info */}
                <div className="job-card-body">

                  {/* Title & Company */}
                  <div className="job-card-top">
                    <Link to={`/jobs/${job.id}`} className="job-card-title">
                      {job.title}
                    </Link>
                    <span className="job-card-company">{job.company_name}</span>
                  </div>

                  {/* Description */}
                  <p className="job-card-desc">{job.description}</p>


                  {/* Meta Row — Stipend | Salary | Location | Posted By + Button */}
                  <div className="job-card-meta-row">

                    <div className="job-meta-item">
                      <span className="job-meta-label">Stipend</span>
                      <span className="job-meta-value">{job.stipend}</span>
                    </div>

                    <div className="job-meta-divider"></div>

                    <div className="job-meta-item">
                      <span className="job-meta-label">Salary</span>
                      <span className="job-meta-value">{job.salary}</span>
                    </div>

                    <div className="job-meta-divider"></div>

                    <div className="job-meta-item">
                      <span className="job-meta-label">Location</span>
                      <span className="job-meta-value">{job.location}</span>
                    </div>

                    <div className="job-meta-divider"></div>

                    <div className="job-meta-item">
                      <span className="job-meta-label">Posted By</span>
                      <span className="job-meta-value">{job.posted_by.username}</span>
                    </div>

                    <Link to={`/jobs/${job.id}`} className="btn btn-primary job-card-btn">
                      View Details
                    </Link>

                  </div>

                </div>

              </div>
            ))}
          </div>
          

        </div>
  

      </div>
    </>
  )
}