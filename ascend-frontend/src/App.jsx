import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { CreateJob } from "./components/CreateJobForm"
import { JobDetailPage } from "./pages/JobDetailPage"
import { CreateStudentProfile } from "./pages/CreateStudentProfile"
import { Profile } from "./pages/Profile"
import { MyDrives } from "./pages/MyDrives"
import { AdminDashboard } from "./pages/AdminDashboard"
import { Toaster } from "react-hot-toast"
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            color: "#0F172A",
            boxShadow: "0 10px 30px rgba(124, 58, 237, 0.15)",
            fontFamily: "Inter, sans-serif",
          },
        }}
      />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />

          <Route path="/jobs/create/" element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          } />


          <Route
            path="/jobs/:id" element={
              <ProtectedRoute>
                <JobDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="create/studentprofile"
            element={
              <ProtectedRoute>
                <CreateStudentProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="profile/"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="mydrives/"
            element={
              <ProtectedRoute>
                <MyDrives />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
