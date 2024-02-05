import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './header.css';
import useAuth from "../hooks/useAuth";
function Header() {
    const [username, setUsername] = useState("");
    const [tipeAsset, setTipeAsset] = useState([]);
    const {auth, setAuth} = useAuth();

    useEffect(() => {
        setUsername(auth.username);
    }, [auth]);

    useEffect(() => {
        axios
        .get("http://localhost:3001/api/tipeasset/list", {
            withCredentials: true,
            auth: {
                username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            }
        })
        .then((res) => setTipeAsset(res.data.data))
        .catch((err) => console.log(err))
    }, [])

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3001/api/user/logout', {
                withCredentials: true
            });
            setAuth({});
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid g-0">
            <nav className="navbar navbar-header-main-webpage p-2 fixed-top">
                <ul className="nav">
                    <li className="navbar-brand">
                        <img src="/logopsi.jpg" className="image-logo-header-main-webpage"></img>
                    </li>
                </ul>
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link"><i className="fa-solid fa-house-chimney"></i> Home</Link>
                    </li>
                    <li className="nav-item">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle kategori" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-toolbox"></i> Product
                            </button>
                            <ul className="dropdown-menu kategori" aria-labelledby="dropdownMenuButton1">
                            {
                                tipeAsset.map((data, i) => (
                                    <li key={i}><Link key={data.tipeAsset} className="dropdown-item kategori" to={"/allproduct/"+data.tipeAsset}>{data.keterangan}</Link></li>   
                                ))
                            }
                            </ul>
                        </div>
                    </li>
                    {
                        username ? (<ul className="nav">
                        <li className="nav-item">
                            <Link to={`/penyewaan/list/${username}`} className="nav-link"><i className="fa-solid fa-file-invoice"></i> Riwayat Sewa</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/profile/` + username} className="nav-link"><i className="fa-solid fa-user"></i> {username}</Link>
                        </li>
                        <li className="nav-item"> 
                            <Link onClick={handleLogout} className="nav-link"><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</Link>
                        </li>
                        </ul>)
                        :
                        (<ul className="nav"><li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li></ul>)
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Header;