import useInterceptorRefreshToken from "../hooks/useInterceptorRefreshToken";
import Header from "./header"
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import format from "date-fns/format";
import { Link } from "react-router-dom";
import './list.css';
import Footer from "./footer";
import handleStatus from "../function/handleStatus";
import axios from "axios";

export function List() {
    const [username, setUsername] = useState("");
    const [penyewaan, setPenyewaan] = useState([]);
    const [nomorSeri, setNomorSeri] = useState("");
    const [nama, setNama] = useState("");
    const {auth} = useAuth();
    const axiosPrivate = useInterceptorRefreshToken();

    useEffect(() => {
        setUsername(auth.username);
    }, [])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/penyewaan/search/" + username)
            .then((response) => (setPenyewaan(response.data.data), setNomorSeri(response.data.data[0].nomorSeri)))
            .catch((error) => console.log(error))
    }, [username])

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/equipment/search/nomorseri/" + nomorSeri, {
            auth: {
                username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            }
        })
            .then((res) => setNama(res.data.data[0].nama))
            .catch((err) => console.log(err))
    }, [nomorSeri])

    return (
        <div className="container-fluid g-0 d-flex flex-column min-vh-100">
            <div className="row">
                <div className="col">
                    <Header/>       
                </div>
            </div>
            <div className="row mb04">
                <div className="col">
                    <div className="container-fluid g-0 content d-flex justify-content-center">
                        <div>
                            <h4 className="text-center h4-riwayat-penyewaan">RIWAYAT PENYEWAAN</h4>
                            <table className="table table-striped table-bordered table-hover table-riwayat-sewa-username">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col">No</th>
                                        <th scope="col">Peralatan</th>
                                        <th scope="col">Tanggal Awal Sewa</th>
                                        <th scope="col">Tanggal Berakhir Sewa</th>
                                        <th scope="col">Alamat Proyek</th>
                                        <th scope="col">Harga Total</th>
                                        <th scope="col">Jumlah</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        penyewaan.map((data,i) => (
                                        <tr scope="row" key={i+1}>
                                                <td>{i+1}</td>
                                                <td>{nama}</td>
                                                <td>{format(new Date(data.tanggalAwalSewa),'dd-MMM-yy')}</td>
                                                <td>{format(new Date(data.tanggalBerakhirSewa), 'dd-MMM-yy')}</td>
                                                <td>{data.alamatProyek}</td>
                                                <td>Rp. {data.hargaTotal.toLocaleString("id-ID")}</td>
                                                <td>{data.jumlah}</td>
                                                <td className="text-center">{handleStatus(data.status)}</td>
                                                <td className="text-center"><Link to={`/penyewaan/detail/${data.nomorKuotasi}`}><i className="fa-solid fa-circle-info"></i></Link></td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-auto">
                <div className="col">
                    <Footer />
                </div>
            </div>
        </div>
    )
}