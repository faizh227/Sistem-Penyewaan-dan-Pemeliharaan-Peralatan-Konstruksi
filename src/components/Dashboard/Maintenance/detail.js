import Header from "../Main/header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Read as KerusakanRead} from "./Kerusakan/read";
import format from "date-fns/format";
import { Sidebar } from "../Main/sidebar";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import axios from "axios";

export function Detail() {
    const {no} = useParams();
    const [maintenance, setMaintenance] = useState([]);
    const [merk, setMerk] = useState("");
    const [nomorSeri, setNomorSeri] = useState("");
    const axiosPrivate = useInterceptorRefreshToken();

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/maintenance/detail/" + no)
            .then((res) => (setMaintenance(res.data.data), setNomorSeri(res.data.data[0].nomorSeri)))
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
            .then((res) => (setMerk(res.data.data[0].merk)))
            .catch((err) => console.log(err))
    }, [nomorSeri])

    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col-auto sidebar">
                    <Sidebar/>
                </div>
                <div className="col">
                    <Header/>
                    <div className="container-fluid g-0 p-3">
                        <h5 style={{textAlign: "center", fontWeight: 700}}>Detail Pemeliharaan Kerusakan Peralatan & Mesin</h5>
                        <div className="card p-3 mt-3 mb-3">
                            {maintenance.map((data,i) => (
                            <div className="row" key={i}>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">No : </label>
                                        <input type="text" className="form-control" value={data.no} readOnly></input>
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Tanggal : </label>
                                        <input type="text" className="form-control" value={format(new Date(data.tanggal), 'dd/MM/yyyy')} readOnly></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">Pemohon : </label>
                                        <input type="text" className="form-control" value={data.pemohon} readOnly></input>
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Bagian : </label>
                                        <input type="text" className="form-control" value={data.bagian} readOnly></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">Item : </label>
                                        <input type="text" className="form-control" value={data.item}></input>    
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">Merk/Tipe : </label>
                                        <input type="text" className="form-control" value={merk}></input>    
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">Lain-Lain : </label>
                                        <input type="text" className="form-control" value={data.lainLain}></input>
                                    </div>
                                </div>
                            </div>
                            ))
                            }
                        </div>
                        <KerusakanRead/>
                    </div>
                </div>
            </div>
        </div>
    )
}