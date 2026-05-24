
import { useEffect, useState } from "react"
import api from "../api"
import { useParams } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
export function JobDetailPage() {
    const [jobDetail, setJobDetail] = useState([])

    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [description, setDescription] = useState("")
    const [skills, setSkills] = useState("")
    const [stipend, setStipend] = useState("")
    const [salary, setSalary] = useState("")
    const [location, setLocation] = useState("")

    const [editMode, setEditMode] = useState(false)
    const { isAdmin } = useAuth()
    const navigate = useNavigate()

    const [students, setStudents] = useState({})
    const [addStudentsMode, setAddStudentsMode] = useState(false)

    const [selectedStudentsForDrive, setSelectedStudentsForDrive] = useState([])

    const [studentsinthisDrive, setStudentsinthisDrive] = useState([])
    const [studentinthisDriveMode, setStudentsinthisDriveMode] = useState(false)

    const [requestedStudents, setRequestedStudents] = useState([])
    const [requestedStudentsMode, setRequestedStudentsMode] = useState(false)


    const [requestedSelectedStudentsforDrive, setRequestedSelectedStudentsforDrive] = useState([])


    const [showStudentsinthisDriveMode, setshowStudentsinthisDriveMode] = useState(false)
    const [shorlistedApplications, setShortlistedApplications] = useState([])

    const [shorlistedStudentsforthisDrive, setShorlistedStudentsforthisDrive] = useState([])
    const [viewShorlistedStudentsMode,setViewShortlistedStudentsMode] = useState(false)

    useEffect(() => {
        api.get(`/api/jobs/${id}`)
            .then((response) => {
                setJobDetail(response.data)
            })
    }, [id])


    const handleDelete = async () => {
        try {
            await api.delete(`/api/jobs/delete/${id}/`, { students: selectedStudentsForDrive })
            alert("Job post deleted successfully ")
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    const startEdit = () => {
        setTitle(jobDetail.title)
        setCompanyName(jobDetail.company_name)
        setDescription(jobDetail.description)
        setSkills(jobDetail.skills_requires)
        setStipend(jobDetail.stipend)
        setSalary(jobDetail.salary)
        setLocation(jobDetail.location)
        setEditMode(true)
    }

    const handleUpdate = async () => {
        const data = {

            title: title,
            company_name: companyName,
            description: description,
            skills_requires: skills,
            salary: salary,
            stipend: stipend,
            location: location
        }
        try {
            await api.patch(`/api/jobs/update/${id}/`, data)
            alert("Job post updated successfully")

            const response = await api.get(`/api/jobs/${id}`)
            setJobDetail(response.data)
            setEditMode(false)

        } catch (error) {
            console.log(error)
        }
    }

    const listStudents = async () => {
        try {
            await api.get("/api/students/")
                .then((response) => {
                    setStudents(response.data)
                    setAddStudentsMode(true)

                })
        } catch (error) {
            console.log(error)
            alert("Error in Fetching Students")
        }
    }


    function handleCheckbox(studentId) {
        if (selectedStudentsForDrive.includes(studentId)) {
            setSelectedStudentsForDrive(selectedStudentsForDrive.filter(
                id => id !== studentId
            ))
        }
        else {
            setSelectedStudentsForDrive([...selectedStudentsForDrive, studentId])
        }
    }

    const handleAddStudents = async () => {
        try {

            await api.post(`/api/application/create/${id}/`, { students: selectedStudentsForDrive })
            alert("Added Students successfully")
            setAddStudentsMode(false)


        } catch (error) {
            console.log(error)
            alert("Error in adding students to the drive ")
        }
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
            await api.post(`/api/application/approve/${id}/`, {
                students: requestedSelectedStudentsforDrive
            })

        } catch (error) {
            console.log(error)
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
            await api.post(`/api/shortlisted/update/${id}/`, { shortlisted_ids: shorlistedApplications })
            alert("Successfully Shortlisted")
        } catch (error) {
            console.log(error.response.data)
        }



    }
    const handleViewshorlisted = async()=>{
        try{
            const res = await api.get(`/api/application/shortlisted/${id}`)
            console.log(res.data)
            setShorlistedStudentsforthisDrive(res.data)
            setViewShortlistedStudentsMode(true)
        }catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <>
                <h1>{jobDetail.title}</h1>

                <p>{jobDetail.company_name}</p>

                <p>{jobDetail.description}</p>

                <p>{jobDetail.skills_requires}</p>

                <p>{jobDetail.stipend}</p>

                <p>{jobDetail.salary}</p>

                <p>{jobDetail.location}</p>
            </>

            {isAdmin && (
                <>
                    <button onClick={handleDelete}>Delete job post </button>
                    <button onClick={startEdit}>Update Job post </button>
                    <button onClick={handleRequestedStudents}>Requested Students</button>
                    {editMode && (
                        <>
                            <input
                                type="text"
                                placeholder="Job Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Company Name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />

                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Skills"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Stipend"
                                value={stipend}
                                onChange={(e) => setStipend(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />

                            <button onClick={handleUpdate}>
                                Save Update
                            </button>
                        </>

                    )}
                    <button onClick={listStudents}>Add Students </button>
                    {addStudentsMode && (
                        <>
                            {students.map((student) => {
                                return (
                                    <div key={student.id}>

                                        <input
                                            type="checkbox"
                                            checked={selectedStudentsForDrive.includes(student.id)}
                                            onChange={() => handleCheckbox(student.id)}

                                        />
                                        <span> {student.username} </span>
                                    </div>

                                )
                            })}
                            <button onClick={handleAddStudents}>Add selected students </button>

                        </>

                    )}
                    <button onClick={handleStudentsinthisDrive}>Students in this drive </button>
                    {studentinthisDriveMode && (
                        <>
                            {studentsinthisDrive.map((application) => {
                                return (
                                    <div key={application.id}>
                                        <p>{application.student.username}</p>
                                    </div>
                                )
                            })}

                        </>
                    )}


                    {requestedStudentsMode && (
                        <>
                            {requestedStudents.map((requestedStudent) => {
                                return (
                                    <div key={requestedStudent.id}>
                                        <input
                                            type="checkbox"
                                            checked={requestedSelectedStudentsforDrive.includes(requestedStudent.id)}
                                            onChange={() =>handlerequestedCheckbox(requestedStudent.id)}
                                        />

                                        <span>
                                            {requestedStudent.student.username}
                                        </span>
                                    </div>
                                );
                            })}

                            <button onClick={handleAddRequestedStudents}>
                                Add these requested students to the drive
                            </button>
                        </>
                    )}


                    <button onClick={handleShowStudentsforShortlisting}> Shortlist Students for the next round </button>
                    {showStudentsinthisDriveMode && (
                        <>

                            {studentsinthisDrive.map((application) => {
                                return (
                                    <div key={application.id}>
                                        <input
                                            type="checkbox"
                                            checked={shorlistedApplications.includes(application.id)}
                                            onChange={() => handleShortlistedCheckbox(application.id)}

                                        />
                                        <span>{application.student.username}</span>

                                    </div>
                                )
                            })

                            }
                            <button onClick={handleShortlistings}> Shortlist Selected </button>
                        </>
                    )}

                </>



            )}
            <button onClick = {handleViewshorlisted}> View Shortlisted  </button>
            {viewShorlistedStudentsMode &&(
                <>
                
                   {shorlistedStudentsforthisDrive.map((shortlistedStudent)=>{
                    return(
                        <div key = {shortlistedStudent.id}>
                            <p>{shortlistedStudent.student.username}</p>

                        </div>
                    )
                   })} 
                
                </>
            )}

            {!isAdmin && (
                <>
                    <button onClick={handleRequest}> Request for this Drive </button>
                </>
            )}
        </>
    )
}