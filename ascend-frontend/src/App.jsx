import { BrowserRouter,Route,Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        
        <Route path = "/" element = {<ProtectedRoute> <Home/> </ProtectedRoute>}/>
       
        <Route path = "/login/" element = {<Login/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
