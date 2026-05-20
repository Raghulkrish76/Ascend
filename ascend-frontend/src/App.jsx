import { BrowserRouter,Route,Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { CreateJob } from "./components/CreateJobForm"
import { JobDetailPage } from "./pages/JobDetailPage"
import { CreateStudentProfile } from "./pages/CreateStudentProfile"
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


        <Route
          path  = "/jobs/:id" element = {
            <ProtectedRoute>
              <JobDetailPage/>
            </ProtectedRoute>
          }
        
        
        />

        <Route   
        path = "create/studentprofile"
        element = {<CreateStudentProfile/>}
        />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
