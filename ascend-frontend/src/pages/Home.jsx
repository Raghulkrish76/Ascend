import { useEffect,useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
export function Home(){

    const [jobs,setJobs] = useState([])
    const navigate = useNavigate()
    
    useEffect(()=>{
        api.get("/api/jobs/")
        .then((response)=>{
            console.log(response.data)
            setJobs(response.data)
        }) .catch((error) => {

                console.log(error);

            });

    },[])
    return(
        <>
         <p> THIS IS HOME PAGE !! fg</p>
         {jobs.map((job)=>{
            return(
                <div key = {job.id}>
                 <h2>{job.title}</h2>
                 <p>{job.skills_requires}</p>
                 <p>{job.company_name}</p>
                 <p>{job.description}</p>
                 <p>{job.stipend}</p>
                 <p>{job.salary}</p>
                 <p>{job.location}</p>
                 <p>{job.posted_by}</p>
            </div>
            )
            
         })}

         <button
            onClick={()=>navigate("/jobs/create/")}
         >Post a job + </button>
        </>
    )
}