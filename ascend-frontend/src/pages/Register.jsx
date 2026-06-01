import { Form } from "../components/Form"

export function Register(){
    return(
        <>
        <title>Ascend | Register </title>
        <Form  route = "/api/auth/register/" method = "register"/>
        
        </>
    )
}