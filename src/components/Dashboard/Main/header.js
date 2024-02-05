import { Link, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import './header.css'

function Header() {
    const [username, setUsername] = useState("");
    const Navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    useEffect(() => {
        setUsername(auth.username);
    }, [auth]);

    const handleLogout = async () => {
        await axios.get('http://localhost:3001/api/user/logout', {
            withCredentials: true
        })
        .then((res) => 
          (setAuth({}),
          window.location.reload())
        )
        .catch((err) => console.log(err))
    }

  return (
    <nav className="navbar navbar-light justify-content-end bg-light header-dashboard">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" disabled>{username}</Link>
        </li>
        <li className="nav-item"> 
          <Link onClick={handleLogout} className="nav-link">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;