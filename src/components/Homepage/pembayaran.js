import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import './pembayaran.css';
import useInterceptorRefreshToken from "../hooks/useInterceptorRefreshToken";

export function Pembayaran() {
    const {order_id} = useParams();
    const [hargaTotal, setHargaTotal] = useState(0);
    const [nomorKuotasi, setNomorKuotasi] = useState(0);
    const [namaLengkap, setNamaLengkap] = useState("");
    const [email, setEmail] = useState("");
    const [noTelepon, setNoTelepon] = useState("");
    const [alamatProyek, setAlamatProyek] = useState("");
    const [token, setToken] = useState("");
    const [nama, setNama] = useState("");
    const [nomorSeri, setNomorSeri] = useState("");
    const [jumlah, setJumlah] = useState(0);
    const [merk, setMerk] = useState("");
    const axiosPrivate = useInterceptorRefreshToken();
    const Navigate = useNavigate();

    useEffect(() => {
        const handleOutPageAndBrowser = async (event) => {
            await axiosPrivate
                .patch("http://localhost:3001/api/penyewaan/generate/order_id/" + order_id)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }

        window.addEventListener('beforeunload', handleOutPageAndBrowser);

        return () => {
            window.removeEventListener('beforeunload', handleOutPageAndBrowser)
        }
    })

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/penyewaan/detail/order_id/" + order_id)
            .then((res) => (setHargaTotal(Math.floor((11 * res.data.data[0].hargaTotal)/100 + res.data.data[0].hargaTotal)), setNomorKuotasi(res.data.data[0].nomorKuotasi)))
            .catch((err) => console.log(err))
    }, [order_id])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/kuotasi/search/" + nomorKuotasi)
            .then((res) => (
            setNamaLengkap(res.data.data[0].namaLengkap), 
            setEmail(res.data.data[0].email), 
            setNoTelepon(res.data.data[0].noTelepon), 
            setAlamatProyek(res.data.data[0].alamatProyek),
            setNama(res.data.data[0].nama),
            setNomorSeri(res.data.data[0].nomorSeri),
            setJumlah(res.data.data[0].jumlah),
            setMerk(res.data.data[0].merk)
            ))
            .catch((err) => console.log(err))
    }, [nomorKuotasi])

    function handleSubmit(event) {
        event.preventDefault();
        axiosPrivate
            .post("http://localhost:3001/api/pembayaran/detail/" + order_id, {
                hargaTotal,
                namaLengkap,
                email,
                noTelepon,
                nomorSeri,
                jumlah,
                nama,
                merk,
                alamatProyek,
            })
            .then((res) => setToken(res.data.data.token))
            .catch((err) => console.log(err))
    }
    
    useEffect(() => {
         if (token) {
            try {
                axiosPrivate
                .patch("http://localhost:3001/api/penyewaan/update/status/by/order_id/" + order_id)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
            } catch (error) {
                console.log(error);
            }
            //Insert to Pembayaran Without Status 
            try 
            {
                axiosPrivate.post("http://localhost:3001/api/pembayaran/insert/" + order_id, {
                    hargaTotal,
                    namaLengkap,
                    noTelepon,
                    email,
                    alamatProyek,
                    token,
                })
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
            } catch (error) {
                console.log(error);
            }
            // Load the Midtrans Snap library
            const script = document.createElement('script');
            script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'; // Replace with production URL if needed
            script.async = true;
            const midtransClientKey = "SB-Mid-client-nGW2U77w4x8xQtbQ";
            script.setAttribute("data-client-key", midtransClientKey);

            document.body.appendChild(script);
    
            script.onload = () => {
            window.snap.pay(token, {
                onSuccess: function(result) {
                let transaction_status = result.transaction_status;
                try {
                    axiosPrivate
                        .patch("http://localhost:3001/api/pembayaran/update/status/" + order_id, {
                            transaction_status
                        })
                        .then((res) => Navigate(`/penyewaan/detail/${nomorKuotasi}`))
                        .catch((err) => console.log(err))
                } catch (error) {
                    console.log(error);
                }
                },
                onPending: function(result) {
                let transaction_status = result.transaction_status;
                try {
                    axiosPrivate
                        .patch("http://localhost:3001/api/pembayaran/update/status/" + order_id, {
                            transaction_status
                        })
                        .then((res) => Navigate(`/penyewaan/detail/${nomorKuotasi}`))
                        .catch((err) => console.log(err))
                } catch (error) {
                    console.log(error);
                }
                },
                onError: function(result) {
                let transaction_status = result.transaction_status;
                try {
                    axiosPrivate
                        .patch("http://localhost:3001/api/pembayaran/update/status/" + order_id, {
                            transaction_status
                        })
                        .then((res) => Navigate(`/penyewaan/detail/${nomorKuotasi}`))
                        .catch((err) => console.log(err))
                } catch (error) {
                    console.log(error);
                }
                },
                onClose: function() {
                let transaction_status = 'closed';
                try {
                    axiosPrivate
                        .patch("http://localhost:3001/api/pembayaran/update/status/" + order_id, {
                            transaction_status
                        })
                        .then((res) => Navigate(`/penyewaan/detail/${nomorKuotasi}`))
                        .catch((err) => console.log(err))
                } catch (error) {
                    console.log(error);
                }
                }
            });
            };
    
            return () => {
            // Clean up: remove the dynamically added script when the component unmounts
            document.body.removeChild(script);
            };
        }
    }, [token]);
    
    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col">
                    <Header/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="container-fluid g-0 content d-flex justify-content-center mb-5">
                        <form onSubmit={handleSubmit}>
                            <div className="card p-3 card-container-fluid-pembayaran">
                                <b><h5 style={{fontWeight:700}}>Detail Pembayaran</h5></b>
                                <label className="form-label mt-3">Order Id: </label>
                                <input type="text" className="form-control" value={order_id} readOnly></input>
                                <label className="form-label mt-3">Harga Total: </label>
                                <input type="text" className="form-control" value={hargaTotal} readOnly></input>
                                <b><h5 style={{fontWeight:700}} className="mt-4">Detail Customer</h5></b>
                                <label className="form-label mt-3">Nama Lengkap: </label>
                                <input type="text" className="form-control" value={namaLengkap} readOnly></input>
                                <label className="form-label mt-3">Email: </label>
                                <input type="text" className="form-control" value={email} readOnly></input>
                                <label className="form-label mt-3">No Telepon: </label>
                                <input type="text" className="form-control" value={noTelepon} readOnly></input>
                                <label className="form-label mt-3">Alamat Proyek: </label>
                                <input type="text" className="form-control" value={alamatProyek} readOnly></input>
                                <button className="btn btn-danger btn-bayar-pembayaran">Bayar</button>
                            </div>
                        </form>
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