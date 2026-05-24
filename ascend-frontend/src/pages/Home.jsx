import { useEffect,useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { Navbar } from "../components/Navbar"
export function Home(){

    const [jobs,setJobs] = useState([])
    const navigate = useNavigate()
    const {isAdmin}  = useAuth()
    
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
        <Navbar/>
         <p> THIS IS HOME PAGE !! fg</p>
          
         {!isAdmin &&(
            
            <>
            
               <button> Create Student Profile </button> 
            </>
         )}
         {isAdmin &&(
            <button
            onClick={()=>navigate("/jobs/create/")}>Post a job + </button>
         )}
         {jobs.map((job)=>{
            return(
                <div key = {job.id}>
                <Link to={`/jobs/${job.id}`}> <h2>{job.title}</h2></Link>
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

        
        </>
    )
}