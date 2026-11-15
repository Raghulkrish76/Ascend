import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import "../styles/Navbar.css"

export function Navbar() {
    const { username } = useAuth()
    const { role } = useAuth()
    const { isAdmin } = useAuth()

    const handleLogout = (e) => {
        e.preventDefault()
        const confirmed = window.confirm("Are you sure you want to logout ?")
        if(!confirmed) return
        localStorage.clear()
        window.location.href = "/login";
    }

    return (
        <>
            <nav className="navbar">

                <div className="navbar-logo">
                    Ascend
                </div>

                <ul className="navbar-links">

                    <li className="navbar-item">
                        <Link className="navbar-link" to="/">
                            Home
                        </Link>
                    </li>

                    {!isAdmin && (
                        <>
                            <li className="navbar-item">
                                <Link className="navbar-link" to="/mydrives">
                                    My Drives
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="navbar-link" to="/profile">
                                    Profile
                                </Link>
                            </li>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <li className="navbar-item">
                                <Link className="navbar-link" to="/admin/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                        </>
                    )}

                    <li className="navbar-item" onClick={handleLogout}>
                        <Link className="navbar-link navbar-link--logout">
                            Logout
                        </Link>
                    </li>

                    <li className="navbar-user-badge">
                        <span className="navbar-username">{username}</span>
                        <span className="navbar-role-tag">{role}</span>
                    </li>

                </ul>

            </nav>
        </>
    )
}