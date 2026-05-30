import api from "../../api"
import { useState } from "react"

export function EditJobForm({jobDetail,jobId,onUpdateSuccess}) {

   
    const [title, setTitle] = useState(jobDetail.title)
    const [companyName, setCompanyName] = useState(jobDetail.company_name)
    const [description, setDescription] = useState(jobDetail.description)
    const [skills, setSkills] = useState(jobDetail.skills_requires)
    const [stipend, setStipend] = useState(jobDetail.stipend)
    const [salary, setSalary] = useState(jobDetail.salary)
    const [location, setLocation] = useState(jobDetail.location)


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
            await api.patch(`/api/jobs/update/${jobId}/`, data)
            alert("Job post updated successfully")
            onUpdateSuccess()
           

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="jd-panel">
                <h3 className="jd-panel-title">Edit Job Details</h3>
                <div className="jd-form-grid">
                    <input 
                    className="jd-input" type="text" placeholder="Job Title"
                        value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input className="jd-input" type="text" placeholder="Company Name"
                        value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    <textarea className="jd-input jd-textarea" placeholder="Description"
                        value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input className="jd-input" type="text" placeholder="Skills"
                        value={skills} onChange={(e) => setSkills(e.target.value)} />
                    <input className="jd-input" type="text" placeholder="Stipend"
                        value={stipend} onChange={(e) => setStipend(e.target.value)} />
                    <input className="jd-input" type="text" placeholder="Salary"
                        value={salary} onChange={(e) => setSalary(e.target.value)} />
                    <input className="jd-input" type="text" placeholder="Location"
                        value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <button className="jd-btn jd-btn-primary" onClick={handleUpdate}>
                    Save Update
                </button>
            </div>

        </>
    )
}