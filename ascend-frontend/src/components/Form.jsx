import { useState } from "react"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import api from "../api"
import { useNavigate } from "react-router-dom"
import "../styles/Login.css"
import { Link } from "react-router-dom"



export function Form({ route, method }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [adminToken, setAdminToken] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = { username, password }
            if (method === 'register' && adminToken) {
                payload.admin_token = adminToken
            }
            const res = await api.post(route, payload)
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)

                const profileRes = await api.get("/api/studentprofile/exists/")
                if (profileRes.data.exists) {
                    navigate("/")
                } else {
                    navigate("/create/studentprofile/")
                }
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error.response.data)
            alert(JSON.stringify(error.response.data))
        } finally {
            setLoading(false)
        }
    }

    const isLogin = method === 'login'

    return (
        <div className="auth-page">

            {/* Left Panel — Branding */}
            <div className="auth-left">
                <div className="auth-left-logo">Ascend</div>
                <p className="auth-left-tagline">Campus Placement &amp; Drive Management System</p>
                <div className="auth-left-separator"></div>
                <p className="auth-left-desc">
                    Manage placement drives, student applications, and recruitment workflows efficiently.
                </p>
            </div>

            {/* Right Panel — Form */}
            <div className="auth-right">
                <div className="auth-form-box">
                    <h1 className="auth-form-title">
                        {isLogin ? "Welcome back" : "Create an account"}
                    </h1>
                    <p className="auth-form-subtitle">
                        {isLogin ? "Sign in to your Ascend account" : "Register to get started with Ascend"}
                    </p>

                    <form onSubmit={handleSubmit}>
                        <input
                            className="auth-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            className="auth-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        {method === 'register' && (
                            <input
                                className="auth-input"
                                type="text"
                                value={adminToken}
                                onChange={(e) => setAdminToken(e.target.value)}
                                placeholder="Admin Token (optional)"
                            />
                        )}
                        <button
                            className="auth-submit-btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
                        </button>
                        <br/>
                        <br/>
                        <p className="auth-form-subtitle">
                        {isLogin ? <> Haven't Registered Yet ? <Link to = "/register/">Register Here  </Link> </> : <> Already Have account <Link to = "/login/">Login Here </Link> </> }
                        </p>
                    </form>
                </div>
            </div>

        </div>
    )
}