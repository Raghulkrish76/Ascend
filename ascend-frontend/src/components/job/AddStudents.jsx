import { useEffect, useState } from "react"
import api from "../../api"

export function AddStudents({ jobId, onClose }) {
    const [students, setStudents] = useState([])
    const [selectedStudentsForDrive, setSelectedStudentsForDrive] = useState([])
    const [filters, setFilters] = useState({
        batch: "",
        department: "",
        year_of_study: "",
        min_cgpa: "",
        studentname: ""
    })
    const [appliedFilters, setAppliedFilters] = useState({})

    function handleCheckbox(studentId) {
        if (selectedStudentsForDrive.includes(studentId)) {
            setSelectedStudentsForDrive(
                selectedStudentsForDrive.filter(id => id !== studentId)
            )
        } else {
            setSelectedStudentsForDrive([...selectedStudentsForDrive, studentId])
        }
    }

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    const handleAppliedFilter = () => {
        setAppliedFilters({ ...filters })
    }

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const params = new URLSearchParams()
                Object.entries(appliedFilters).forEach(([key, value]) => {
                    if (value) {
                        params.append(key, value)
                    }
                })

                const response = await api.get(`/api/students/?${params.toString()}`)
                setStudents(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchStudents()
    }, [appliedFilters])

    const handleAddStudents = async () => {
        try {
            await api.post(`/api/application/create/${jobId}/`, {
                students: selectedStudentsForDrive
            })
            alert("Added Students successfully")
            onClose()
        } catch (error) {
            console.log(error)
            alert("Error in adding students to the drive")
        }
    }

    return (
        <div className="jd-panel">
            <div className="jd-panel-header">
                <h3 className="jd-panel-title">Add Students to Drive</h3>
                <button
                    type="button"
                    className="jd-btn jd-btn-secondary"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>

            <div className="jd-form-grid jd-filter-grid">
                <input
                    type="text"
                    name="studentname"
                    className="jd-input"
                    placeholder="Student Name"
                    value={filters.studentname}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="batch"
                    className="jd-input"
                    placeholder="Batch "
                    value={filters.batch}
                    onChange={handleFilterChange}
                />

                <select
                    name="department"
                    className="jd-input"
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
                    className="jd-input"
                    placeholder="Year of Study"
                    value={filters.year_of_study}
                    onChange={handleFilterChange}
                />

                <input
                    type="number"
                    name="min_cgpa"
                    className="jd-input"
                    step="0.01"
                    placeholder="Min CGPA"
                    value={filters.min_cgpa}
                    onChange={handleFilterChange}
                />

                
            </div>

            <div className="jd-panel-actions jd-filter-actions">
                <button
                    type="button"
                    className="jd-btn jd-btn-primary"
                    onClick={handleAppliedFilter}
                >
                    Search Students
                </button>
            </div>

            <div className="jd-student-section-block">
                <h4 className="jd-subtitle">Select Students to Add</h4>

                <div className="jd-student-list">
                    {students.length > 0 ? (
                        students.map((student) => {
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
                        })
                    ) : (
                        <div className="jd-empty-state">
                            No students found. Apply filters and search.
                        </div>
                    )}
                </div>

                <button
                    className="jd-btn jd-btn-primary"
                    onClick={handleAddStudents}
                >
                    Add Selected Students
                </button>
            </div>
        </div>
    )
}