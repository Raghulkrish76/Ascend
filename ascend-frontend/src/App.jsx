import { BrowserRouter,Route,Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { CreateJob } from "./components/CreateJobForm"
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        
        <Route path = "/" element = {<ProtectedRoute> <Home/> </ProtectedRoute>}/>
       
        <Route path = "/login/" element = {<Login/>}/>
        <Route path = "/register/" element = {<Register/>}/>

        <Route path = "/jobs/create/" element = {
          <ProtectedRoute>
            <CreateJob/>
          </ProtectedRoute>
        }/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
