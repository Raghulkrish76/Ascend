import { Form } from "../components/Form"
export function Login(){
    

    return(
        <>
            <title>Ascend | Login </title>
            <Form  route = "/api/auth/login/" method = "login"/>
        </>
    )
}