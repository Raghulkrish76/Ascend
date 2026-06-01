export function JobInfoCard({ job }) {
  if (!job) return null;

  const skills = job.skills_requires
    ? job.skills_requires.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="jd-info-card">

      {/* ── Colored header banner ── */}
      <div className="jd-card-header">
        <h1 className="jd-title">{job.title}</h1>
        <p className="jd-company">{job.company_name}</p>
      </div>

      {/* ── Card body ── */}
      <div className="jd-card-body">

        {/* Description */}
        <p className="jd-desc-label">About the Role</p>
        <div className="jd-description-wrapper">
          <p className="jd-description">{job.description}</p>
        </div>

        {/* ── Meta Grid: Stipend | Salary | Location ── */}
        <div className="jd-meta-grid">

          <div className="jd-meta-tile">
            <span className="jd-meta-tile__icon">💰</span>
            <div className="jd-meta-tile__body">
              <span className="jd-meta-tile__label">Stipend</span>
              <span className="jd-meta-tile__value">
                {job.stipend ? `${job.stipend}` : "—"}
              </span>
            </div>
          </div>

          <div className="jd-meta-tile">
            <span className="jd-meta-tile__icon">💼</span>
            <div className="jd-meta-tile__body">
              <span className="jd-meta-tile__label">Salary</span>
              <span className="jd-meta-tile__value">
                {job.salary ? `₹${job.salary}` : "—"}
              </span>
            </div>
          </div>

          <div className="jd-meta-tile">
            <span className="jd-meta-tile__icon">📍</span>
            <div className="jd-meta-tile__body">
              <span className="jd-meta-tile__label">Location</span>
              <span className="jd-meta-tile__value">
                {job.location || "—"}
              </span>
            </div>
          </div>

          {/* <div className="jd-meta-tile">
            <span className="jd-meta-tile__icon">📅</span>
            <div className="jd-meta-tile__body">
              <span className="jd-meta-tile__label">Deadline</span>
              <span className="jd-meta-tile__value">
                {job.deadline || "—"}
              </span>
            </div>
          </div> */}

        </div>

        {/* ── Skills Section ── */}
        {skills.length > 0 && (
          <div className="jd-skills-block">
            <p className="jd-skills-block__label">Skills Required</p>
            <div className="jd-skills-block__tags">
              {skills.map((skill, idx) => (
                <span className="jd-skill-tag" key={idx}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}