import { useEffect,useState } from "react"
import api from "../../api"

export function AddStudents({jobId, onClose}){
const [students, setStudents] = useState([])
const [selectedStudentsForDrive, setSelectedStudentsForDrive] = useState([])
const [filters, setFilters] = useState({
        batch: "",
        department: "",
        year_of_study: "",
        min_cgpa: "",
        studentname: ""
    })
    const [appliedFilters,setAppliedFilters] = useState({})

    
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

    const handleFilterChange = (e)=>{
        setFilters({
            ...filters,
            [e.target.name]:e.target.value
        })
    }
    const handleAppliedFilter = ()=>{
        setAppliedFilters({...filters})
    }

    useEffect(()=>{
        const fetchStudents = async()=>{
            try{
                const params = new URLSearchParams()
                Object.entries(appliedFilters).forEach(([key,value])=>{
                    if(value){
                        params.append(key,value)
                    }
                })
                const response = await api.get(`/api/students/?${params.toString()}`)
                setStudents(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchStudents()
    },[appliedFilters])

    const handleAddStudents = async () => {
        try {

            await api.post(`/api/application/create/${jobId}/`, { students: selectedStudentsForDrive })
            alert("Added Students successfully")
            onClose()


        } catch (error) {
            console.log(error)
            alert("Error in adding students to the drive ")
        }
    }


    return(
        <>
        
                            <input
                                type="text"
                                name="batch"
                                placeholder="Batch (e.g. 2022)"
                                value={filters.batch}
                                onChange={handleFilterChange}
                            />

                            <select
                                name="department"
                                value={filters.department}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Departments</option>
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
                                name="year_of_study"
                                placeholder="Year of Study"
                                value={filters.year_of_study}
                                onChange={handleFilterChange}
                            />

                            <input
                                type="number"
                                name="min_cgpa"
                                step="0.01"
                                placeholder="Min CGPA"
                                value={filters.min_cgpa}
                                onChange={handleFilterChange}
                            />

                            <input
                                type="text"
                                name="studentname"
                                placeholder="Student Name"
                                value={filters.studentname}
                                onChange={handleFilterChange}
                            />
                            <button onClick = {handleAppliedFilter}> Search Students </button>

                            <div className="jd-panel">
                                <h3 className="jd-panel-title">Select Students to Add</h3>
                                <div className="jd-student-list">
                                    {students.map((student) => {
                                        return (
                                            <label className="jd-student-row" key={student.id}>
                                                <input
                                                    type="checkbox"
                                                    className="jd-checkbox"
                                                    checked={selectedStudentsForDrive.includes(student.user)}
                                                    onChange={() => handleCheckbox(student.user)}
                                                />
                                                <span>{student.studentname}</span>
                                            </label>
                                        )
                                    })}
                                </div>
                                <button className="jd-btn jd-btn-primary" onClick={handleAddStudents}>Add Selected Students</button>
                            </div>
        
        </>
    )
}