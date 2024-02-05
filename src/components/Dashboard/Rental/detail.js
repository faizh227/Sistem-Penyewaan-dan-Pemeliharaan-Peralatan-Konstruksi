import Header from "../Main/header"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import format from "date-fns/format"
import { Link } from "react-router-dom"
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken"
import { Sidebar } from "../Main/sidebar"
import axios from "axios"
import "./detail.css";
import handleStatus from "../../function/handleStatus";

export function Detail() {
    const { nomorKuotasi } = useParams();
    const [penyewaan, setPenyewaan] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [nomorSeri, setNomorSeri] = useState("");
    const [username, setUsername] = useState("");
    const [orderID, setOrderID] = useState("");
    const [profile, setProfile] = useState([]);
    const [status, setStatus] = useState("");
    const axiosPrivate = useInterceptorRefreshToken();

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/penyewaan/detail/" + nomorKuotasi)
            .then((res) => (setPenyewaan(res.data.data), 
            setOrderID(res.data.data[0].order_id),
            setNomorSeri(res.data.data[0].nomorSeri), 
            setUsername(res.data.data[0].username),
            setStatus(res.data.data[0].status)
            ))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/equipment/search/nomorseri/" + nomorSeri, {
                auth: {
                    username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                    password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                }
            })
            .then((res) => (setEquipment(res.data.data)))
            .catch((err) => console.log(err))
    }, [nomorSeri])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/user/profile/" + username)
            .then((res) => (
                setProfile(res.data.data)
            ))
            .catch((err) => console.log(err))
    }, [username])

    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col-auto sidebar">
                    <Sidebar/>
                </div>
                <div className="col">
                    <Header/>
                    <div className="container-fluid g-0 p-3 d-flex justify-content-center">
                        <div className="card p-3 mt-3 card-detail-penyewaan-admin">
                            <h5 className="text-center"><b>Detail Penyewaan Order ID: {orderID}</b></h5>
                            {
                            equipment.map((data,i) => (
                                <div className="row mt-3">
                                    <img className="image-detail-penyewaan-admin" src={data.image}></img>
                                    <h6 className="mt-3" key={i}><b>Detail Equipment</b></h6>
                                    <p className="lead">Nama : {data.nama}</p>
                                    <p className="lead">Merk : {data.merk}</p>
                                    <p className="lead">Nomor Seri : {data.nomorSeri}</p>
                                    <p className="lead">Nomor Alat : {data.nomorAlat}</p>
                                </div>
                            ))
                            }
                            {penyewaan.map((data,i) => (
                                <div className="row mt-3">  
                                    <h6 key={i}><b>Detail Sewa</b></h6>
                                    <p className="lead">Nomor Kuotasi : {data.nomorKuotasi}</p>
                                    <p className="lead">Tanggal Awal Sewa : {format(new Date(data.tanggalAwalSewa), 'dd-MMM-yy')}</p>
                                    <p className="lead">Tanggal Berakhir Sewa : {format(new Date(data.tanggalBerakhirSewa), 'dd-MMM-yy')}</p>
                                    <p className="lead">Alamat Proyek : {data.alamatProyek}</p>
                                    <p className="lead">Harga Per Unit : Rp. {data.hargaPerUnit} / Bulan</p>
                                    <p className="lead">Harga Total : Rp. {data.hargaTotal}</p>
                                    <p className="lead">Jumlah : {data.jumlah}</p>
                                </div>
                            ))
                            }
                            {
                                profile.map((data,i) => (
                                    <div className="row mt-3">
                                        <h6 key={i}><b>Detail Penyewa</b></h6>
                                        <p className="lead">Nama Lengkap: {data.nama}</p>
                                        <p className="lead">Perusahaan: {data.perusahaan}</p>
                                        <p className="lead">Alamat: {data.alamat}</p>
                                        <p className="lead">No Telepon: {data.noTelepon}</p>
                                    </div>
                                ))
                            }
                            <div className="row mt-3">
                                <h6><b>Status Penyewaan</b></h6>
                                <div>{handleStatus(status)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}