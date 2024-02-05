import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import useInterceptorRefreshToken from "../hooks/useInterceptorRefreshToken";

export function Pay() {
    const {order_id} = useParams();
    const [snapToken, setSnapToken] = useState("");
    const [nomorKuotasi, setNomorKuotasi] = useState("");
    const axiosPrivate = useInterceptorRefreshToken();
    const Navigate = useNavigate();

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/pembayaran/search/" + order_id)
            .then((res) => setSnapToken(res.data.data[0].snapToken))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        axiosPrivate 
            .get("http://localhost:3001/api/penyewaan/detail/order_id/" + order_id)
            .then((res) => setNomorKuotasi(res.data.data[0].nomorKuotasi))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (snapToken) {
            // Load the Midtrans Snap library
            const script = document.createElement('script');
            script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'; 
            script.async = true;
            const midtransClientKey = "SB-Mid-client-nGW2U77w4x8xQtbQ";
            script.setAttribute("data-client-key", midtransClientKey);

            document.body.appendChild(script);
    
            script.onload = () => {
            // Initialize the Snap payment
            window.snap.pay(snapToken, {
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
                        .then((res) =>Navigate(`/penyewaan/detail/${nomorKuotasi}`))
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
    }, [snapToken, nomorKuotasi])

    return(
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col">
                    <Header/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="container-fluid">

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Footer/>
                </div>
            </div>
        </div>
    )
}