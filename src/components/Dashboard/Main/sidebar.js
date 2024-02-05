import { Link } from "react-router-dom"
import './sidebar.css'

export function Sidebar() {
    return (
        <nav className="position-fixed sidebar navbar-dark bg-dark">
            <ul className="nav flex-column">
                <li className="navbar-brand mb-5 d-flex justify-content-center">
                    <img src="/logopsi.jpg" className="image-logo-sidebar"></img>
                </li>
                <li className="nav-item">
                    <Link to={"/dashboard"} className="nav-link">
                        <i className="fa-solid fa-house-chimney"></i>&emsp;Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/equipment/main"} className="nav-link">
                        <i className="fa-solid fa-screwdriver-wrench"></i>&emsp;Peralatan & Mesin
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/dashboard/kategori/main"} className="nav-link"><i className="fa-solid fa-toolbox"></i>&emsp;Tipe Asset</Link>
                </li>
                <li className="nav-item"> 
                    <Link to={"/dashboard/maintenance/main"} className="nav-link"><i className="fa-solid fa-gear"></i>&emsp;Pemeliharaan</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/kuotasi"} className="nav-link"><i className="fa-solid fa-file-invoice-dollar"></i>&emsp;Kuotasi</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/dashboard/penyewaan/main"} className="nav-link"><i className="fa-solid fa-file-invoice"></i>&emsp;Penyewaan</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/dashboard/pembayaran/main"} className="nav-link"><i className="fa-solid fa-hand-holding-dollar"></i>&emsp;Pembayaran</Link>
                </li>
            </ul>
        </nav>
    )
}