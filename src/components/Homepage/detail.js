import Header from "./header"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import './detail.css';
import Footer from './footer';
import useInterceptorRefreshToken from "../hooks/useInterceptorRefreshToken";
import handleStatus from "../function/handleStatus";
import { compareAsc } from "date-fns";

export function Detail() {
    const { nomorKuotasi } = useParams();
    const [penyewaan, setPenyewaan] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [nomorSeri, setNomorSeri] = useState("");
    const [tanggalAwalSewa, setTanggalAwalSewa] = useState("");
    const [tanggalBerakhirSewa, setTanggalBerakhirSewa] = useState("");
    const [transactionStatus, setTransactionStatus] = useState("");
    const [statusPenyewaan, setStatusPenyewaan] = useState("");
    const [kontraksewa, setKontrakSewa] = useState("");
    const [pengiriman, setPengiriman] = useState("");
    const [invoice, setInvoice] = useState("");
    const [serahterima, setSerahTerima] = useState("");
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState("");
    const [statusSewa, setStatusSewa] = useState("");
    const axiosPrivate = useInterceptorRefreshToken();
 
    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/penyewaan/detail/" + nomorKuotasi)
            .then((res) => (
                setPenyewaan(res.data.data), 
                setNomorSeri(res.data.data[0].nomorSeri), 
                setOrderId(res.data.data[0].order_id), 
                setStatusPenyewaan(res.data.data[0].status),
                setTanggalAwalSewa(res.data.data[0].tanggalAwalSewa),
                setTanggalBerakhirSewa(res.data.data[0].tanggalBerakhirSewa),
                setKontrakSewa(res.data.data[0].kontrakKerja),
                setPengiriman(res.data.data[0].pengiriman),
                setStatusSewa(res.data.data[0].status),
                setSerahTerima(res.data.data[0].serahterima),
                setInvoice(res.data.data[0].invoice)
            ))
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/equipment/search/nomorseri/" + nomorSeri, {
            auth: {
                username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            }
        })
            .then((res) => setEquipment(res.data.data))
            .catch((err) => console.log(err))
    }, [nomorSeri])

    useEffect(() => {
        const currentDate = new Date();
        if(statusSewa === "Pengiriman") {
            const resultCompareDateAwalSewa = compareAsc(currentDate, new Date(tanggalAwalSewa));
            if ((resultCompareDateAwalSewa === 0 || resultCompareDateAwalSewa === 1) && kontraksewa && pengiriman) {
                axiosPrivate
                    .patch("http://localhost:3001/api/penyewaan/update/status/aktif/by/order_id/" + orderId)
                    .then((res) => window.location.reload())
                    .catch((err) => console.log(err))
            }
        }
        else if(statusSewa === "Aktif"){
            const resultCompareDateAkhirSewa = compareAsc(currentDate, new Date(tanggalBerakhirSewa));
            if (resultCompareDateAkhirSewa === 0 && kontraksewa && pengiriman && serahterima && invoice) {
                axiosPrivate
                    .patch("http://localhost:3001/api/penyewaan/update/status/by/order_id/" + orderId)
                    .then((res) => window.location.reload())
                    .catch((err) => console.log(err))
            }
        }
    }, [tanggalAwalSewa, tanggalBerakhirSewa, kontraksewa, pengiriman, serahterima, invoice, orderId, statusSewa])

    useEffect(() => {
        if(statusPenyewaan === "Pembayaran")
        {
            axiosPrivate
                .get("http://localhost:3001/api/pembayaran/search/" + orderId)
                .then((res) => {
                            setStatus(res.data.data[0].status)
                        }
                    )
                .catch((err) => console.log(err))
        }
    }, [orderId, statusPenyewaan])

    useEffect(() => {
        if((statusPenyewaan === "Pembayaran" && (status !== "closed" || status !== "waiting")) || statusPenyewaan === "Pengembalian")
        {
            axiosPrivate.get("http://localhost:3001/api/pembayaran/status/" + orderId)
                .then((res) => {
                    if(res.data.data.status_code === "200" || res.data.data.status_code === "201")
                    {
                        setTransactionStatus(res.data.data.transaction_status)
                    }
                    else if(res.data.data.status_code === "404")
                    {
                        setTransactionStatus("");
                    } 
                    })
                .catch((err) => console.log(err))
        }
    }, [orderId, statusPenyewaan, status])

    const handleButtonDocument = (status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima) => {
        switch (status) {
            case "Kontrak":
                return (
                    <div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">
                            <label className="form-label">Kontrak Sewa</label>
                            <Link to={kontrakKerja} className="btn btn-primary btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                    </div>
                )
            case "Pengiriman" :
                return (
                    <div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">
                            <label className="form-label">Kontrak Sewa</label>
                            <Link to={kontrakKerja} className="btn btn-primary btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">          
                            <label className="form-label">Pengiriman</label>
                            <Link to={pengiriman} className="btn btn-info btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                    </div>
                )
            case "Aktif" :
                return (
                    <div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">
                            <label className="form-label">Kontrak Sewa</label>
                            <Link to={kontrakKerja} className="btn btn-primary btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">          
                            <label className="form-label">Pengiriman</label>
                            <Link to={pengiriman} className="btn btn-info btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">          
                            <label className="form-label">Serah Terima</label>
                            <Link to={serahterima} className="btn btn-info btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                    </div>
                )
            case "Pembayaran" :
                return (
                    <div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">
                            <label className="form-label">Kontrak Sewa</label>
                            <Link to={kontrakKerja} className="btn btn-primary btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">          
                            <label className="form-label">Pengiriman</label>
                            <Link to={pengiriman} className="btn btn-info btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">          
                            <label className="form-label">Serah Terima</label>
                            <Link to={serahterima} className="btn btn-info btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">          
                            <label className="form-label">Invoice</label>
                            <Link to={invoice} className="btn btn-info btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                    </div>
                )
            case "Pengembalian" :
                return (
                    <div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">
                            <label className="form-label">Status Pembayaran</label>
                            <div className="btn btn-success btn-detail">{statusTransaction}</div>
                        </div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">
                            <label className="form-label">Kontrak Sewa</label>
                            <Link to={kontrakKerja} className="btn btn-primary btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">          
                            <label className="form-label">Pengiriman</label>
                            <Link to={pengiriman} className="btn btn-info btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">          
                            <label className="form-label">Serah Terima</label>
                            <Link to={serahterima} className="btn btn-info btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">          
                            <label className="form-label">Invoice</label>
                            <Link to={invoice} className="btn btn-info btn-detail" download><i className="fa-solid fa-download"></i> Download</Link>
                        </div>
                    </div>
                )
            default:
                break;
        }
    }

    const handlePembayaran = (status, order_id, statusTransaction, tglberakhirSewa, statusPayment, invoice, kontrakKerja, pengiriman, serahterima) => {
        let result = compareAsc(new Date(), new Date(tglberakhirSewa));

        if(status === "Kontrak")
        {
            return (handleButtonDocument(status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima));
        }
        else if(status === "Pengiriman") {
            return (handleButtonDocument(status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima));
        }
        else if(status === "Aktif") {
            switch (result) {
                case 0:
                    return (
                        <div>
                            {handleButtonDocument(status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima)}
                            <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">
                                <label className="form-label">Pembayaran </label>
                                <Link to={`/pembayaran/detail/` + order_id} className="btn btn-danger btn-detail">Bayar</Link>
                            </div>
                        </div>
                    )
                case 1:
                    return (
                        <div>
                            {handleButtonDocument(status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima)}
                            <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">
                                <p className="lead">Masa sewa melebihi tanggal berakhir sewa, dimohon untuk dapat melanjutkan pembayaran sewa dengan menghubungi perusahaan baik melalui email perusahaan maupun telepon.</p>
                            </div>
                        </div>
                    )
                case -1:
                    return (
                        handleButtonDocument(status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima)
                    )
                default:
                    break;
            }
        }
        else if(status === "Pembayaran")
        {
            if(statusTransaction === "settlement")
            {
                return (
                    <div>
                        <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">
                            <label className="form-label">Status Pembayaran</label>
                            <div className="btn btn-success btn-detail">{statusTransaction}</div>
                        </div>
                        {handleButtonDocument(status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima)}
                    </div>
                )
            }
            else if(statusPayment === "pending")
            {
                return (
                    <div>
                        <div className="card p-2 mt-3  d-flex justify-content-center text-center align-items-center card-component-detail">
                            <label className="label-form">Status Pembayaran</label>
                            <div className="btn btn-secondary btn-detail">{statusPayment}</div>
                        </div>
                        {handleButtonDocument(status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima)}
                        <div className="card p-2 mt-3  d-flex justify-content-center text-center align-items-center card-component-detail">
                            <label className="form-label">Pembayaran </label>
                            <Link to={`/pembayaran/page/${orderId}`} className="btn btn-danger btn-detail">Bayar</Link>
                        </div>
                    </div>
                )
            }
            else if(statusPayment === "expire")
            {
                return (
                    <div>
                        <div className="card p-2 mt-3  d-flex justify-content-center text-center align-items-center card-component-detail">
                            <label className="label-form">Status Pembayaran</label>
                            <div className="btn btn-secondary btn-detail">{statusPayment}</div>
                        </div>
                        {handleButtonDocument(status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima)}
                        <div className="card p-2 d-flex justify-content-center text-center align-items-center card-component-detail">
                            <p className="lead">Terjadi kegagalan saat pembayaran, dimohon untuk dapat melanjutkan pembayaran sewa dengan menghubungi perusahaan baik melalui email perusahaan maupun telepon.</p>
                        </div>
                    </div>
                )
            }
            else if(statusPayment === "closed") {
                return (
                    <div>
                        <div className="card p-2 mt-3  d-flex justify-content-center text-center align-items-center card-component-detail">
                            <label className="label-form">Status Pembayaran</label>
                            <div className="btn btn-secondary btn-detail">{statusPayment}</div>
                        </div>
                         {handleButtonDocument(status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima)}
                         <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">
                             <label className="form-label">Pembayaran </label>
                             <Link to={`/pembayaran/page/` + order_id} className="btn btn-danger btn-detail">Bayar</Link>
                         </div>
                     </div>
                )
            }
            else if(!statusPayment) {
                return (
                    <div>
                         {handleButtonDocument(status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima)}
                         <div className="card p-2 mt-3 d-flex justify-content-center text-center align-items-center card-component-detail">
                             <label className="form-label">Pembayaran </label>
                             <Link to={`/pembayaran/detail/` + order_id} className="btn btn-danger btn-detail">Bayar</Link>
                         </div>
                     </div>
                )
            }
        }
        else if(status === "Pengembalian") {
            return (handleButtonDocument(status, statusTransaction, kontrakKerja, invoice, pengiriman, serahterima));
        }
    }
 
    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col">
                    <Header/>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <div className="container-fluid g-0 content d-flex justify-content-center">
                        <div className="card card-container-fluid-detail">
                            {
                                equipment.map((data,i) => (
                                    <div className="row mt-4" key={i}>
                                        <div className="col d-flex justify-content-center">
                                            <div className="card card-image-component-detail">
                                                <img src={data.image}></img>
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="card p-2 card-info-alat-component-detail">
                                                <h6 className="h6-info-peralatan-main-page-detail text-center mb-4">Informasi Peralatan</h6>
                                                <p className="lead p-info-barang-detail">Nama : {data.nama}</p>
                                                <p className="lead p-info-barang-detail">Merk : {data.merk}</p>
                                                <p className="lead p-info-barang-detail">Nomor Seri : {data.nomorSeri}</p>
                                                <p className="lead p-info-barang-detail">Keterangan : {data.keterangan}</p>
                                                <p className="lead p-info-barang-detail">Jumlah : {data.jumlah}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            {penyewaan.map((data,i) => (
                                <div className="row mt-5 mb-4" key={i}>  
                                    <div className="col">
                                        <div className="card p-2 card-info-sewa-component-detail">
                                            <h6 className="h6-info-penyewaan-main-page-detail text-center mb-4">Informasi Penyewaan</h6>
                                            <p className="lead p-info-barang-detail">Tanggal Awal Sewa : {format(new Date(tanggalAwalSewa), 'dd-MMM-yy')}</p>
                                            <p className="lead p-info-barang-detail">Tanggal Berakhir Sewa : {format(new Date(tanggalBerakhirSewa), 'dd-MMM-yy')}</p>
                                            <p className="lead p-info-barang-detail">Alamat Proyek : {data.alamatProyek}</p>
                                            <p className="lead p-info-barang-detail">Harga Per Unit : Rp. {data.hargaPerUnit.toLocaleString("id-ID")} / Bulan</p>
                                            <p className="lead p-info-barang-detail">Harga Total : Rp. {data.hargaTotal.toLocaleString("id-ID")}</p>
                                            <p className="lead p-info-barang-detail">Jumlah : {data.jumlah}</p>
                                        </div>
                                        <div className="row">
                                            <div className="col d-flex justify-content-center " style={{marginLeft: 30, marginTop: 30}}>
                                                <i className="fa-solid fa-circle-question fa-circle-prosedur"></i>
                                                <Link onClick={(event) => {event.preventDefault(); window.location.replace('/');}} style={{marginLeft:10, marginTop: 2}} className="link-info-prosedur-penyewaan">Untuk mengetahui tahap penyewaan klik disini.</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col d-flex justify-content-center">    
                                        <div>
                                            <div className="card p-2 d-flex justify-content-center text-center align-items-center card-component-detail">
                                                <label className="form-label">Status</label>
                                                {handleStatus(statusSewa)}
                                            </div>
                                                {handlePembayaran(statusSewa, data.order_id, transactionStatus, tanggalBerakhirSewa, status, invoice, kontraksewa, pengiriman, data.serahterima)}
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-auto">
                <div className="col">
                    <Footer/>
                </div>
            </div>
        </div>
    )
}