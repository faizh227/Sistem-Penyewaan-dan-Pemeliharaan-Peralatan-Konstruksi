import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Main/header";
import { Sidebar } from "../../Main/sidebar";
import { useEffect, useState } from "react";
import useInterceptorRefreshToken from "../../../hooks/useInterceptorRefreshToken";
import axios from "axios";
import { handleErrMsg } from "../../../function/handleErrMsg";

export const validation_regex = /^[a-zA-Z0-9]*$/;

export function Form() {
    const {order_id} = useParams();
    const axiosPrivate = useInterceptorRefreshToken();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        perusahaan: '',
        proyek: '',
        namaLengkap: '',
        tanggal: '',
        kondisi: '',
        keterangan: '',
        mobil: '',
        noPol: '',
        driver: '',
    });
    const [namaAlat, setNamaAlat] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [noStock, setNoStock] = useState("");
    const [nomorSeri, setNomorSeri] = useState("");
    const [nomorKuotasi, setNomorKuotasi] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [formData.kondisi, formData.keterangan, formData.mobil, formData.driver, formData.noPol])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/penyewaan/detail/order_id/" + order_id)
            .then((res) => {
                setNomorSeri(res.data.data[0].nomorSeri);
                setNomorKuotasi(res.data.data[0].nomorKuotasi);
                setNoStock(res.data.data[0].nomorSeri);
                setJumlah(res.data.data[0].jumlah);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [order_id])

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/equipment/search/nomorseri/" + nomorSeri, {
                auth: {
                    username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                    password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                }
            })
            .then((res) => {
                setNamaAlat(res.data.data[0].nama + ' ' +  res.data.data[0].merk + ' - ' + res.data.data[0].nomorAlat);
            })
            .catch((err) => console.log(err))
    }, [nomorSeri])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/kuotasi/search/" + nomorKuotasi)
            .then((res) => {
                setFormData(
                    {
                        perusahaan: res.data.data[0].namaPerusahaan,
                        proyek: res.data.data[0].namaProyek,
                        namaLengkap: res.data.data[0].namaLengkap
                    }
                )
            })
            .catch((err) => console.log(err))
    }, [nomorKuotasi])

    const handleInputChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if(!formData.perusahaan || !formData.proyek || !formData.namaLengkap || !formData.tanggal || !namaAlat || !noStock || !jumlah || !formData.kondisi || !formData.keterangan || !formData.mobil || !formData.noPol || !formData.driver) {
            setErrMsg("Kolom masukkan data tidak boleh dikosongkan");
        }
        else {
            const data = {
                perusahaan: formData.perusahaan,
                proyek: formData.proyek,
                namaLengkap: formData.namaLengkap,
                tanggal: formData.tanggal,
                namaAlat: namaAlat,
                noStock: noStock,
                jumlah: jumlah,
                kondisi: formData.kondisi,
                keterangan: formData.keterangan,
                mobil: formData.mobil,
                noPol: formData.noPol,
                driver: formData.driver,
            };
            Navigate('/dashboard/penyewaan/pengiriman/generate', {state: {data}})
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
                        <h5 style={{fontWeight: 700, marginBottom: 30}}>Formulir Pengiriman Barang</h5>
                        {handleErrMsg(errMsg)}
                        <form onSubmit={handleSubmit}>
                            <h6 style={{fontWeight: 700, marginBottom: 21}}>Kepada Yaitu</h6>
                            <label className="form-label">Perusahaan</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="perusahaan"
                                value={formData.perusahaan}
                                onChange={handleInputChange}
                                readOnly
                            ></input>
                            <label className="form-label">Proyek</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="proyek"
                                value={formData.proyek}
                                onChange={handleInputChange}
                                readOnly
                            ></input>
                            <label className="form-label">Nama Lengkap</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="namaLengkap"
                                value={formData.namaLengkap}
                                onChange={handleInputChange}
                                readOnly
                            ></input>
                            <label className="form-label">Tanggal: </label>
                            <input 
                                type="date" 
                                className="form-control"
                                name="tanggal"
                                value={formData.tanggal}
                                onChange={handleInputChange}
                            ></input>
                            <h6 style={{fontWeight: 700, marginTop: 21, marginBottom: 21}}>Peralatan</h6>
                            <label className="form-label">Nama Alat</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="namaAlat"
                                value={namaAlat}
                                onChange={(event) => setNamaAlat(event.target.value)}
                                readOnly
                            ></input>
                            <label className="form-label">NO.Stock</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="noStock"
                                value={noStock}
                                onChange={(event) => setNoStock(event.target.value)}
                                readOnly
                            ></input>
                            <label className="form-label">Jumlah</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="jumlah"
                                value={jumlah}
                                onChange={(event) => setJumlah(event.target.value)}
                                readOnly
                            ></input>
                            <label className="form-label">Kondisi</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="kondisi"
                                value={formData.kondisi}
                                onChange={handleInputChange}
                            ></input>
                            <label className="form-label">Keterangan</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="keterangan"
                                value={formData.keterangan}
                                onChange={handleInputChange}
                                ></input>
                            <h6 style={{fontWeight: 700, marginTop: 21, marginBottom: 21}}>Catatan:</h6>
                            <label className="form-label">Mobil: </label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="mobil"
                                value={formData.mobil}
                                onChange={handleInputChange}
                            ></input>
                            <label className="form-label">No Polisi: </label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="noPol"
                                value={formData.noPol}
                                onChange={handleInputChange}
                            ></input>
                            <label className="form-label">Driver: </label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="driver"
                                value={formData.driver}
                                onChange={handleInputChange}
                            ></input>
                            <button type="submit" className="btn btn-success mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}