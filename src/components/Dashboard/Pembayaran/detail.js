import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../Main/header";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import { Sidebar } from "../Main/sidebar";
import "./detail.css";

export function Detail() {
    const {order_id} = useParams();
    const [pembayaran, setPembayaran] = useState([]);
    const axiosPrivate = useInterceptorRefreshToken();

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/pembayaran/search/" + order_id)
            .then((res) => setPembayaran(res.data.data))
            .catch((err) => console.log(err))
    }, [])

    const handleStatus = (status) => {
        if(status === "settlement")
        {
            return (<button className="btn btn-success btn-detail">{status}</button>)
        }
        else if(status === "pending" || status === "closed")
        {
            return (<button className="btn btn-secondary btn-detail">{status}</button>)
        }
        else if(status === "deny" || status === "cancel" || status === "expire")
        {
            return (<button className="btn btn-danger btn-detail">{status}</button>)
        } 
    }

    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col-auto sidebar">
                    <Sidebar/>
                </div>
                <div className="col">
                    <Header/>
                    <div className="container-fluid g-0 p-3">
                        <form>
                            <h5 className="text-center"><b>Detail Pembayaran</b></h5>
                            {pembayaran.map((data) => (
                                <div className="d-flex justify-content-center">
                                    <div className="card p-3 mt-3 mb-3 card-detail-pembayaran-admin">
                                        <h6 className="header-6-pembayaran-admin mt-3 mb-3"><b>Detail Transaksi</b></h6>
                                        <label className="form-label mt-2">Order ID: </label>
                                        <input type="text" className="form-control" value={data.order_id}></input>
                                        <label className="form-label mt-2">Harga Total: </label>
                                        <input type="text" className="form-control" value={data.hargaTotal}></input>
                                        <label className="form-label mt-2">Status: </label>
                                        {handleStatus(data.status)}
                                        <h6 className="header-6-pembayaran-admin mt-3 mb-3"><b>Detail Pelanggan</b></h6>
                                        <label className="form-label mt-2">Nama Lengkap: </label>
                                        <input type="text" className="form-control" value={data.namaLengkap}></input>
                                        <label className="form-label mt-2">No Telepon: </label>
                                        <input type="text" className="form-control" value={data.noTelepon}></input>
                                        <label className="form-label mt-2">Email: </label>
                                        <input type="text" className="form-control" value={data.email}></input>
                                        <label className="form-label mt-2">Alamat Proyek: </label>
                                        <input type="text" className="form-control" value={data.alamatProyek}></input>
                                    </div>
                                </div>
                            ))
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}