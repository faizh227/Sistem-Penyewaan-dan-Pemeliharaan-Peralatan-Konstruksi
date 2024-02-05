import Header from "./header"
import Footer from "./footer"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import './allproduct.css';

export default function AllProduct() {
    const {tipeAsset} = useParams();
    const [Equipment, setEquipment] = useState([]);
    useEffect(() => {
        axios
        .get("http://localhost:3001/api/equipment/search/tipeAsset/" + tipeAsset, {
            withCredentials: true,
            auth: {
                username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            }
        })
        .then((res) => setEquipment(res.data.data))
        .catch((err) => console.log(err))
    }, [tipeAsset])

    return (
    <div className="container-fluid g-0">
        <div className="row">
            <div className="col">
                <Header/>
            </div>
        </div>
        <div className="container-fluid content">
             <div className="row 
             row-cols-xxl-4
             row-cols-xl-3
             row-cols-md-2
             row-cols-sm-1
             row-cols-xs-1
             ">
                {
                    Equipment.map((data, i) => {
                    if(data.status === "Tersedia") return (
                    <div className="col mt-3 mb-3" key={data.no}>
                        <div className="container-fluid">
                            <div className="card p-3 allproduct available">
                                <div className="row">
                                    <div className="col mt-1 d-flex justify-content-center">
                                        <div className="card card-image-allproduct">
                                            <img src={data.image} alt={data.nama} className="img-allproduct"></img> 
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col mt-1 d-flex justify-content-center align-items-center text-center">
                                        <div className="card card-product-allproduct">
                                            <p>{data.nama} - {data.merk}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col mt-1 d-flex justify-content-center align-items-center text-center">
                                        <div className="card card-product-allproduct">
                                            <p>Harga Sewa: Rp.{data.hargaSewa.toLocaleString("id-ID")}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col mt-1 d-flex justify-content-center">
                                        <Link to={`/product/${data.no}`} className="navigation-link-allproduct">
                                            <div className="card card-detail-allproduct available">
                                                Detail
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                    else return (
                    <div className="col mt-3 mb-3" key={data.no}>
                        <div className="container-fluid">
                            <div className="card p-3 allproduct unavailable">
                                <div className="row">
                                    <div className="col mt-1 d-flex justify-content-center">
                                        <div className="card card-image-allproduct">
                                            <img src={data.image} alt={data.nama} className="img-allproduct"></img> 
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col mt-1 d-flex justify-content-center align-items-center text-center">
                                        <div className="card card-product-allproduct">
                                            <p>{data.nama} - {data.merk}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col mt-1 d-flex justify-content-center align-items-center text-center">
                                        <div className="card card-product-allproduct">
                                            <p>Harga Sewa: Rp.{data.hargaSewa.toLocaleString("id-ID")}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col mt-1 d-flex justify-content-center">
                                        <Link className="navigation-link-allproduct" onClick={(event) => event.preventDefault()}>
                                            <div className="card card-detail-allproduct unavailable">
                                                Detail
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="overlay">
                                    <div className="card overlay text">
                                        Unavailable
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                    }) 
                }
            </div>
        </div>
        <div className="row mt-auto">
            <div className="col">
                <Footer />
            </div>
        </div>
    </div>
    )
}