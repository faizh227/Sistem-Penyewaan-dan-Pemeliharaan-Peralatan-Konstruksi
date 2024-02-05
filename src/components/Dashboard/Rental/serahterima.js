import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from '../Main/header';
import { Sidebar } from '../Main/sidebar';
import format from "date-fns/format"
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import handleStatus from "../../function/handleStatus";
import { handleErrMsg } from "../../function/handleErrMsg";

export function SerahTerima() {
    const {order_id} = useParams();
    const [penyewaan, setPenyewaan] = useState([]);
    const [file, setFile] = useState("");
    const axiosPrivate = useInterceptorRefreshToken();
    const Navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    
    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/penyewaan/detail/order_id/" + order_id)
            .then((res) => (setPenyewaan(res.data.data), console.log(res)))
            .catch((err) => console.log(err))
    }, [order_id])

    function handleSubmit(event) {
        event.preventDefault();
        axiosPrivate
            .patch("http://localhost:3001/api/penyewaan/upload/serahterima/" + order_id, {
                file,
            }, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            })
            .then((res) => Navigate('/dashboard/penyewaan/main'))
            .catch((err) => {
                switch (err.response.data.status) {
                    case 400:
                        switch (err.response.data.message) {
                            case "File tidak ada":
                                setErrMsg("Silahkan untuk memilih file terlebih dahulu");
                                break;
                        
                            default:
                                break;
                        }
                        break;
                
                    default:
                        break;
                }
            })
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
                        <h5 className="text-center"><b>Formulir Upload Surat Serah Terima Barang</b></h5>
                        {penyewaan.map((data) => (
                            <div className="d-flex justify-content-center">
                                <form onSubmit={handleSubmit}>
                                    <div className="card p-3 mt-3 card-formulir-upload-dokumen">
                                        {handleErrMsg(errMsg)}
                                        <label className="form-label">Order ID : </label>
                                        <input type="text" className="form-control" value={data.order_id} readOnly></input>
                                        <label className="form-label">Nomor Kuotasi : </label>
                                        <input type="text" className="form-control" value={data.nomorKuotasi} readOnly></input>
                                        <label className="form-label">Nomor Seri: </label>
                                        <input type="text" className="form-control" value={data.nomorSeri} readOnly></input>
                                        <label className="form-label">Tanggal Awal Sewa : </label>
                                        <input type="text" className="form-control" value={format(new Date(data.tanggalAwalSewa), 'dd-MMM-yy')} readOnly></input>
                                        <label className="form-label">Tanggal Berakhir Sewa : </label>
                                        <input type="text" className="form-control" value={format(new Date(data.tanggalBerakhirSewa), 'dd-MMM-yy')} readOnly></input>
                                        <label className="form-label">Alamat Proyek : </label>
                                        <input type="text" className="form-control" value={data.alamatProyek} readOnly></input>
                                        <label className="form-label">Harga Per Unit : </label>
                                        <input type="text" className="form-control" value={data.hargaPerUnit} readOnly></input>
                                        <label className="form-label">Harga Total : </label>
                                        <input type="text" className="form-control" value={data.hargaTotal} readOnly></input>
                                        <label className="form-label">Status : </label>
                                        {handleStatus(data.status)}
                                        <label className="form-label">Serah Terima : </label>
                                        <input type="file" name="file" className="form-control" onChange={(event) => setFile(event.target.files[0])}></input>
                                    </div>
                                    <button className="btn btn-primary mt-3 btn-update-admin"><i class="fa-solid fa-pen-to-square update"></i>&emsp;Ubah</button>
                                </form>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
} 