export function JobInfoCard({job}){
    return(
        <>
        <div className="jd-info-card">
            <h1 className="jd-title">{job.title}</h1>
            <p className="jd-company">{job.company_name}</p>
            <p className="jd-description">{job.description}</p>

            <div className="jd-meta-grid">
                <div className="jd-meta-item">
                    <span className="jd-meta-label">Skills Required</span>
                    <span className="jd-meta-value">{job.skills_requires}</span>
                </div>
                <div className="jd-meta-item">
                    <span className="jd-meta-label">Stipend</span>
                    <span className="jd-meta-value">{job.stipend}</span>
                </div>
                <div className="jd-meta-item">
                    <span className="jd-meta-label">Salary</span>
                    <span className="jd-meta-value">{job.salary}</span>
                </div>
                <div className="jd-meta-item">
                    <span className="jd-meta-label">Location</span>
                    <span className="jd-meta-value">{job.location}</span>
                </div>
            </div>
        </div>
        
        
        </>
    )
}