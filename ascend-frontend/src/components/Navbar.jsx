import { Link } from "react-router-dom"

export function Navbar() {

    const navStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        backgroundColor: "#7C3AED",
        color: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }

    const logoStyle = {
        fontSize: "28px",
        fontWeight: "bold",
        fontFamily: "Exo 2"
    }

    const ulStyle = {
        display: "flex",
        alignItems: "center",
        gap: "25px",
        listStyle: "none",
        margin: 0,
        padding: 0
    }

    const linkStyle = {
        textDecoration: "none",
        color: "white",
        fontSize: "16px",
        fontWeight: "500",
        transition: "0.3s"
    }
    const handleLogout = ()=>{
        localStorage.clear()
        window.location.href = "/login";
    }

    return (
        <>
            <nav style={navStyle}>

                <div style={logoStyle}>
                    Ascend
                </div>

                <ul style={ulStyle}>

                    <li>
                        <Link style={linkStyle} to="/">
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link style={linkStyle} to="/applications">
                            My Applications
                        </Link>
                    </li>

                    <li>
                        <Link style={linkStyle} to="/profile">
                            Profile
                        </Link>
                    </li>

                    <li onClick = {handleLogout}>
                        
                        <Link style={linkStyle} to="/logout">
                            Logout
                        </Link>
                    </li>

                </ul>

            </nav>
        </>
    )
}