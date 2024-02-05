import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import format from "date-fns/format";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import handleStatus from "../../function/handleStatus";
import "./read.css";
import { handleErrMsg } from "../../function/handleErrMsg"

export function Read() {
    const [Penyewaan, setPenyewaan] = useState([]);
    const axiosPrivate = useInterceptorRefreshToken();
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/penyewaan/list")
            .then((response) => setPenyewaan(response.data.data))
            .catch((error) => console.log(error))
    }, [])

    const handleConfirmationStatus = async (order_id) => {
        try {
            await axiosPrivate.patch("http://localhost:3001/api/penyewaan/confirm/status/pengembalian/" + order_id);
            window.location.reload();
        } catch (err) {
            switch (err.response.data.status) {
                case 400:
                    setErrMsg("Proses penyewaan sedang berlangsung");
                    break;
                default:
                    break;
            }
        }
    }

    return ( 
        <div className="container-fluid g-0 p-3">
            {handleErrMsg(errMsg)}
            <table className="table table-striped table-bordered table-hover mt-3">
                <thead>
                    <tr className="sticky-top">
                        <th scope="col">No</th>
                        <th scope="col">Order ID</th>
                        <th scope="col">Nomor Kuotasi</th>
                        <th scope="col">Tanggal Awal Sewa</th>
                        <th scope="col">Tanggal Berakhir Sewa</th>
                        <th scope="col">Alamat Proyek</th>
                        <th scope="col">Harga Total</th>
                        <th scope="col">Status</th>
                        <th scope="col">Kontrak Sewa</th>
                        <th scope="col">Pengiriman</th>
                        <th scope="col">Serah Terima</th>
                        <th scope="col">Invoice</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Penyewaan.map((data, i) => (
                            <tr key={i}>
                                <td>{data.noPenyewaan}</td>
                                <td>{data.order_id}</td>
                                <td>{data.nomorKuotasi}</td>
                                <td>{format(new Date(data.tanggalAwalSewa), 'dd-MMM-yy')}</td>
                                <td>{format(new Date(data.tanggalBerakhirSewa), 'dd-MMM-yy')}</td>
                                <td>{data.alamatProyek}</td>
                                <td>Rp. {data.hargaTotal.toLocaleString("id-ID")}</td>
                                <td>{handleStatus(data.status)}</td>
                                <td><Link to={`/dashboard/penyewaan/upload/kontrakkerja/${data.order_id}`}><i className="fa-solid fa-upload"></i></Link>
                                <Link to={data.kontrakKerja}><i className="fa-solid fa-download ms-3"></i></Link></td>
                                <td width="130px"><Link to={`/dashboard/penyewaan/form/pengiriman/${data.order_id}`}><i className="fa-solid fa-file-pdf"></i></Link>
                                <Link to={`/dashboard/penyewaan/upload/pengiriman/${data.order_id}`}><i className="fa-solid fa-upload ms-3"></i></Link>
                                <Link to={data.pengiriman}><i className="fa-solid fa-download ms-3"></i></Link></td>
                                <td width="130px"><Link to={`/dashboard/penyewaan/serahterima/generate/${data.order_id}`}><i className="fa-solid fa-file-pdf"></i></Link>
                                <Link to={`/dashboard/penyewaan/upload/serahterima/${data.order_id}`}><i className="fa-solid fa-upload ms-3"></i></Link>
                                <Link to={data.pengembalian}><i className="fa-solid fa-download ms-3"></i></Link></td>
                                <td width="130px"><Link to={`/dashboard/penyewaan/invoice/generate/${data.order_id}`}><i className="fa-solid fa-file-pdf"></i></Link>
                                <Link to={`/dashboard/penyewaan/upload/invoice/${data.order_id}`}><i className="fa-solid fa-upload ms-3"></i></Link>
                                <Link to={data.invoice}><i className="fa-solid fa-download ms-3"></i></Link></td>
                                <td width="80px"><Link to={`/dashboard/penyewaan/detail/${data.nomorKuotasi}`}><i className="fa-solid fa-circle-info"></i></Link>
                                <Link className="ms-3" onClick={(event) => handleConfirmationStatus(data.order_id)}><i className="fa-solid fa-check"></i></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}