import api from "../api";
import { useState} from "react";
import { useNavigate } from "react-router-dom";


export function CreateJob(){

    const [title,setTitle] = useState("")
    const [companyName , setCompanyName] = useState("")
    const [description,setDescription] = useState("")
    const [skills,setSkills] = useState("")
    const [stipend,setStipend] = useState("")
    const [salary,setSalary] = useState("")
    const [location,setLocation] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async()=>{
        try{
            const formData = new FormData()
        formData.append("title",title)
        formData.append("company_name",companyName)
        formData.append("description",description)
        formData.append("skills_requires",skills)
        formData.append("stipend",stipend)
        formData.append("salary",salary)
        formData.append("location",location)

        await api.post("api/jobs/create/",formData)

        navigate("/")

        }catch(error){
            console.log(error)
        }
        

       

    }


    return(
        <>
        <form>
        <input
        type = "text"
        placeholder = "Enter job Title"
        onChange={(e)=>setTitle(e.target.value)}
        />
        <input
        type = "text"
        placeholder = "Company Name"
        onChange={(e)=>setCompanyName(e.target.value)}
        />
        <input
        type = "text"
        placeholder = "Description"
        onChange={(e)=>setDescription(e.target.value)}
        />
        <input
        type = "text"
        placeholder="Skills| Enter them in comman seprated values without space"
        onChange={(e)=>setSkills(e.target.value)}
        />

        <input
        type = "text"
        placeholder="stipend"
        onChange={(e)=>setStipend(e.target.value)}
        />
        <input
        type = "text"
        placeholder="salary"
        onChange={(e)=>setSalary(e.target.value)}
        />
        <input
        type = "text"
        placeholder="Location"
        onChange={(e)=>setLocation(e.target.value)}
        />
        <button type = "button"onClick={handleSubmit}>Submit</button>
        </form>
        </>
    )
}

