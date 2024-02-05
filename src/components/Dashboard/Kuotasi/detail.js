import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../Main/header";
import format from "date-fns/format";
import { Link } from "react-router-dom";
import { Sidebar } from "../Main/sidebar";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import "./detail.css";

export function Detail() {
    const { nomorKuotasi } = useParams();
    const [kuotasi, setKuotasi] = useState([]);
    const axiosPrivate = useInterceptorRefreshToken();

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/kuotasi/search/" + nomorKuotasi)
            .then(
                (response) => [setKuotasi(response.data.data), console.log(response.data.data)]
            )
            .catch((error) => console.log(error));
    }, [])

    const handleStatus = (status) => {
        if (status === "Perlu Tindak Lanjut") {
            return (<button className="btn btn-warning">{status}</button>);
        }
        else if (status === "Disetujui") {
            return (<button className="btn btn-success">{status}</button>)
        }
    }

    const handleLink = (status) => {
        if (status === "Perlu Tindak Lanjut") {
            return (<Link to={`/kuotasi/form/send/penawaranharga/${nomorKuotasi}`} className="btn btn-success btn-kirim-penawaran-harga">Kirim Penawaran Harga</Link>);
        }
    }

    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col-auto sidebar">
                    <Sidebar />
                </div>
                <div className="col">
                    <Header></Header>
                    <div className="container-fluid g-0 p-3 d-flex justify-content-center">
                        {kuotasi.map((data, i) => (
                            <div className="card p-3 mt-3 card-detail-kuotasi">
                                <h5><b>Detail Kuotasi Nomor: {nomorKuotasi}</b></h5>
                                <div className="row mt-3">
                                    <h6><b>Detail Equipment</b></h6>
                                    <p className="lead">Nama : {data.nama}</p>
                                    <p className="lead">Merk : {data.merk}</p>
                                    <p className="lead">Nomor Seri: {data.nomorSeri}</p>
                                    <p className="lead">Jumlah: {data.jumlah} Unit</p>
                                </div>
                                <div className="row mt-3">
                                    <h6><b>Detail Penyewa</b></h6>
                                    <p className="lead">Nama Lengkap: {data.namaLengkap}</p>
                                    <p className="lead">Nama Perusahaan: {data.namaPerusahaan}</p>
                                    <p className="lead">Email: {data.email}</p>
                                    <p className="lead">No Telepon:{data.noTelepon}</p>
                                    <p className="lead">Tanggal Awal Sewa: {format(new Date(data.tanggalAwalSewa), 'dd-MMM-yy')}</p>
                                    <p className="lead">Tanggal Berakhir Sewa: {format(new Date(data.tanggalBerakhirSewa), 'dd-MMM-yy')}</p>
                                    <p className="lead">Nama Proyek: {data.namaProyek}</p>
                                    <p className="lead">Alamat Proyek: {data.alamatProyek}</p>
                                </div>
                                <div className="row mt-3">
                                    <h6><b>Status Kuotasi</b></h6>
                                    <p className="lead">{handleStatus(data.status)}</p>
                                </div>
                                <div className="row mt-3 d-flex justify-content-center">
                                    {handleLink(data.status)}
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}