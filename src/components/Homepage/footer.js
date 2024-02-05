import './footer.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Footer() {
    const [tipeAsset, setTipeAsset] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/tipeasset/list", {
                withCredentials: true,
                auth: {
                    username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                    password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                }
            })
            .then((res) => (setTipeAsset(res.data.data)))
            .catch((err) => console.log(err))
    }, [])

    return (
        <footer>
            <div className="container-fluid g-0">
                <div className='footer'>
                    <div className='row mt-4'>
                        <div className='col'>
                            <Link><i className="fa-brands icon-footer fa-facebook"></i></Link>
                            <Link><i className="fa-brands icon-footer fa-square-instagram"></i></Link>
                            <Link><i className="fa-brands icon-footer fa-square-twitter"></i></Link>
                            <p className='lead info-footer-alamat'>Jl. Raya Hankam No. 85 (Jl. Mabes 2) RT. 008 RW. 005 Jatimurni - Pondok Melati Bekasi, 
                            Jawa Barat 17431</p>
                            <p className='lead info-footer-alamat'>Jl. Mawar No. 24 RT. 001 RW. 005, 
                            Balik Alam, Duri, Mandau, Bengkalis - Riau 28784</p>    
                        </div>  
                        <div className='col'>
                            <div className='row'>
                                <div className='col'>    
                                    <h6 className='header-footer'>Produk</h6>
                                    {
                                        tipeAsset.map((data,i) => (
                                            <div className="col" key={i}>
                                                <Link className='nav-link-footer' to={"/allproduct/"+data.tipeAsset}>{data.keterangan}</Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='col'>
                                    
                                </div>
                                <div className='col'>
                                    <h6 className='header-footer'>Kontak Kami</h6>
                                    <p className='lead info-footer'><i className="fa-solid fa-phone"></i> 0218452172</p>
                                    <p className='lead info-footer'><i className="fa-solid fa-phone"></i> 02122853374</p>
                                    <p className='lead info-footer'><i className="fa-solid fa-phone"></i> 22853594</p>
                                    <p className='lead info-footer'><i className="fa-solid fa-envelope"></i> psi@procurin.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;