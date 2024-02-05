import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken"

export function Read() {
    const [pembayaran, setPembayaran] = useState([]);
    const axiosPrivate = useInterceptorRefreshToken();

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/pembayaran/list")
            .then((res) => (setPembayaran(res.data.data)))
            .catch((err) => console.log(err))
    })

    const handleStatus = (status) => {
        if(status === "settlement")
        {
            return (<button className="btn btn-success">{status}</button>)
        }
        else if(status === "pending" || status === "closed")
        {
            return (<button className="btn btn-secondary">{status}</button>)
        }
        else if(status === "deny" || status === "cancel" || status === "expire")
        {
            return (<button className="btn btn-danger">{status}</button>)
        } 
    }
    return (
        <div className="container-fluid g-0 p-3">
            <div className="row">
                <div className="col">
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Harga Total</th>
                                <th>Nama Lengkap</th>
                                <th>Nomor Telepon</th>
                                <th>Email</th>
                                <th>Alamat Proyek</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pembayaran.map((data,i) => (
                                <tr key={i}>
                                    <td>{data.order_id}</td>
                                    <td>Rp.{data.hargaTotal.toLocaleString("id-ID")}</td>
                                    <td>{data.namaLengkap}</td>
                                    <td>{data.noTelepon}</td>
                                    <td>{data.email}</td>
                                    <td>{data.alamatProyek}</td>
                                    <td>{handleStatus(data.status)}</td>
                                    <td><Link to={`/dashboard/pembayaran/detail/${data.order_id}`}><i className="fa-solid fa-circle-info"></i></Link></td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}