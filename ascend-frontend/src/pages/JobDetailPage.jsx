import { useEffect, useState } from "react"
import api from "../api"
import { useParams } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import "../styles/JobDetails.css"
import { Navbar } from "../components/Navbar"
import { JobInfoCard } from "../components/job/JobInfoCard"
import { EditJobForm } from "../components/job/EditJobForm"
import { AddStudents } from "../components/job/AddStudents"

export function JobDetailPage() {
    const [jobDetail, setJobDetail] = useState([])

    const { id } = useParams()

    const [editMode, setEditMode] = useState(false)
    const { isAdmin } = useAuth()
    const navigate = useNavigate()

   
    const [addStudentsMode, setAddStudentsMode] = useState(false)

    

    const [studentsinthisDrive, setStudentsinthisDrive] = useState([])
    const [studentinthisDriveMode, setStudentsinthisDriveMode] = useState(false)

    const [requestedStudents, setRequestedStudents] = useState([])
    const [requestedStudentsMode, setRequestedStudentsMode] = useState(false)
    const [requestedSelectedStudentsforDrive, setRequestedSelectedStudentsforDrive] = useState([])


    const [showStudentsinthisDriveMode, setshowStudentsinthisDriveMode] = useState(false)
    const [shorlistedApplications, setShortlistedApplications] = useState([])

    const [shorlistedStudentsforthisDrive, setShorlistedStudentsforthisDrive] = useState([])
    const [viewShorlistedStudentsMode, setViewShortlistedStudentsMode] = useState(false)




    useEffect(() => {
        api.get(`/api/jobs/${id}`)
            .then((response) => {
                setJobDetail(response.data)
            })
    }, [id])


    const handleDelete = async () => {
        try {
            await api.delete(`/api/jobs/delete/${id}/`)
            alert("Job post deleted successfully ")
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    const onUpdateSuccess = async()=>{
        const response = await api.get(`/api/jobs/${id}`)
        setJobDetail(response.data)
        setEditMode(false)
    }

    const handleStudentsinthisDrive = async () => {
        try {
            const res = await api.get(`/api/application/job/${id}`)
            console.log(res.data)
            setStudentsinthisDrive(res.data)
            setStudentsinthisDriveMode(true)


        } catch (error) {
            console.log(error.data)
            console.log(error)
        }
    }


    const handleRequest = async () => {
        try {
            await api.post(`/api/application/create/requested/${id}/`)
            alert("Successfully Requested")
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleRequestedStudents = async () => {
        try {
            const res = await api.get(`/api/application/requested/${id}`)
            setRequestedStudents(res.data)
            setRequestedStudentsMode(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handlerequestedCheckbox = (studentId) => {

        if (requestedSelectedStudentsforDrive.includes(studentId)) {

            setRequestedSelectedStudentsforDrive(
                requestedSelectedStudentsforDrive.filter(
                    id => id !== studentId
                )
            )

        } else {

            setRequestedSelectedStudentsforDrive([
                ...requestedSelectedStudentsforDrive,
                studentId
            ])

        }
    }

    const handleAddRequestedStudents = async () => {
        try {
            await api.patch(`/api/application/approve/${id}/`, {
                students: requestedSelectedStudentsforDrive
            })

        } catch (error) {
            console.log(error.response.data)
        }
    }
    const handleShowStudentsforShortlisting = async () => {
        const res = await api.get(`/api/application/job/${id}`)
        console.log(res.data)
        setStudentsinthisDrive(res.data)
        setshowStudentsinthisDriveMode(true)
    }
    function handleShortlistedCheckbox(applicationId) {
        if (shorlistedApplications.includes(applicationId)) {
            setShortlistedApplications(shorlistedApplications.filter(
                id => id != applicationId
            ))
        }
        else {
            setShortlistedApplications([...shorlistedApplications, applicationId])
        }
    }
    const handleShortlistings = async () => {
        try {
            await api.post(`/api/shortlisted/update/${id}/`, { shortlisted_ids: shorlistedApplications, roundstatus: "shortlisted" })
            alert("Successfully Shortlisted")
        } catch (error) {
            console.log(error.response.data)
        }



    }
    const handleViewshorlisted = async () => {
        try {
            const res = await api.get(`/api/application/shortlisted/${id}`)
            console.log(res.data)
            setShorlistedStudentsforthisDrive(res.data)
            setViewShortlistedStudentsMode(true)
        } catch (error) {
            console.log(error) 
        }
    }
    const handleSelect = async () => {
        try {
            await api.post(`/api/shortlisted/update/${id}/`, {
                shortlisted_ids: shorlistedApplications, roundstatus: "selected"

            })
            alert("Successuly Selected Students")
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <>
        
       
       <Navbar/>
        <div className="jd-page">
             
            
            {/* ── Job Info Card ── */}
            <JobInfoCard job={jobDetail}/>
           

            {isAdmin && (
                <div className="jd-admin-section">

                    {/* ── Admin Action Buttons ── */}
                    <div className="jd-admin-actions">
                        <button className="jd-btn jd-btn-danger" onClick={handleDelete}>Delete Job Post</button>
                        <button className="jd-btn jd-btn-secondary" onClick={()=>setEditMode(true)}>Update Job Post</button>
                        <button className="jd-btn jd-btn-secondary" onClick={handleRequestedStudents}>Requested Students</button>
                        <button className="jd-btn jd-btn-secondary" onClick={()=>setAddStudentsMode(true)}>Add Students</button>
                        <button className="jd-btn jd-btn-secondary" onClick={handleStudentsinthisDrive}>Students in this Drive</button>
                        <button className="jd-btn jd-btn-secondary" onClick={handleShowStudentsforShortlisting}>Shortlist Students</button>
                    </div>

                    {/* ── Edit Form ── */}
                    {editMode && (
                       <EditJobForm jobDetail = {jobDetail} jobId={id} onUpdateSuccess = {onUpdateSuccess}/>
                    )}

                    {/* ── Add Students Panel ── */}
                    {addStudentsMode && (
                            <AddStudents jobId = {id} onclose = {()=>setAddStudentsMode(false)}/>
                    )}

                    {/* ── Students in Drive ── */}
                    {studentinthisDriveMode && (
                        <div className="jd-panel">
                            <h3 className="jd-panel-title">Students in This Drive</h3>
                            <div className="jd-student-list">
                                {studentsinthisDrive.map((application) => {
                                    return (
                                        <div className="jd-student-row jd-student-row--readonly" key={application.id}>
                                            <p>{application.student.username}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* ── Requested Students Panel ── */}
                    {requestedStudentsMode && (
                        <div className="jd-panel">
                            <h3 className="jd-panel-title">Requested Students</h3>
                            <div className="jd-student-list">
                                {requestedStudents.map((requestedStudent) => {
                                    return (
                                        <label className="jd-student-row" key={requestedStudent.id}>
                                            <input
                                                type="checkbox"
                                                className="jd-checkbox"
                                                checked={requestedSelectedStudentsforDrive.includes(requestedStudent.id)}
                                                onChange={() => handlerequestedCheckbox(requestedStudent.id)}
                                            />
                                            <span>{requestedStudent.student.username}</span>
                                        </label>
                                    );
                                })}
                            </div>
                            <button className="jd-btn jd-btn-primary" onClick={handleAddRequestedStudents}>
                                Approve Selected Students
                            </button>
                        </div>
                    )}

                    {/* ── Shortlisting Panel ── */}
                    {showStudentsinthisDriveMode && (
                        <div className="jd-panel">
                            <h3 className="jd-panel-title">Shortlist / Select Students</h3>
                            <div className="jd-student-list">
                                {studentsinthisDrive.map((application) => {
                                    return (
                                        <label className="jd-student-row" key={application.id}>
                                            <input
                                                type="checkbox"
                                                className="jd-checkbox"
                                                checked={shorlistedApplications.includes(application.id)}
                                                onChange={() => handleShortlistedCheckbox(application.id)}
                                            />
                                            <span>{application.student.username}</span>
                                        </label>
                                    )
                                })}
                            </div>
                            <div className="jd-panel-actions">
                                <button className="jd-btn jd-btn-primary" onClick={handleShortlistings}>Shortlist Selected</button>
                                <button className="jd-btn jd-btn-success" onClick={handleSelect}>Select as Final</button>
                            </div>
                        </div>
                    )}

                </div>
            )}

            {/* ── View Shortlisted (visible to all) ── */}
            <div className="jd-shortlisted-section">
                <button className="jd-btn jd-btn-secondary" onClick={handleViewshorlisted}>View Shortlisted</button>
                {viewShorlistedStudentsMode && (
                    <div className="jd-panel">
                        <h3 className="jd-panel-title">Shortlisted Students</h3>
                        <div className="jd-student-list">
                            {shorlistedStudentsforthisDrive.map((shortlistedStudent) => {
                                return (
                                    <div className="jd-student-row jd-student-row--readonly" key={shortlistedStudent.id}>
                                        <p>{shortlistedStudent.student.username}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>

            {!isAdmin && (
                <div className="jd-student-cta">
                    <button className="jd-btn jd-btn-primary" onClick={handleRequest}>Request for this Drive</button>
                </div>
            )}

        </div>
    </>
    )
}