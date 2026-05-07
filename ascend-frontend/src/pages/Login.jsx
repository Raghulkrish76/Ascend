import { useState } from "react"
import api from "../api"
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants"
export function Login(){
    const [username , setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await api.post("/api/auth/login/",{username,password})
            localStorage.setItem(ACCESS_TOKEN,res.data.access)
            localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
            navigate("/")
        }
        catch(error){
            alert(error)
        }

    }

    return(
        <>
            <form onSubmit = {handleSubmit}>
            <input
              type = "text"
              onChange = {(e)=> setUsername(e.target.value)}
              placeholder="Username "
            />
            <input 
                type = "password"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button type = "submit" >Login </button>
            </form>
        </>
    )
}