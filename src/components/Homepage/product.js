import axios from "axios"
import Header from "./header"
import Footer from "./footer"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './product.css';

export default function Product() {
    const { no } = useParams();
    const [nama, setNama] = useState("");
    const [merk, setMerk] = useState("");
    const [nomorSeri, setNomorSeri] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [tipeAsset, setTipeAsset] = useState(0);
    const [kategori, setKategori] = useState("");
    const [jumlah, setJumlah] = useState();
    const [image, setImage] = useState(null);
    const [hargaSewa, setHargaSewa] = useState(0);
    const [lokasi, setLokasi] = useState("");
  
    useEffect(() => {
        axios
        .get("http://localhost:3001/api/equipment/search/" + no, {
                auth: {
                    username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                    password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                }
            })
        .then(
            (response) => (
            setNama(response.data.data[0].nama),
            setMerk(response.data.data[0].merk),
            setNomorSeri(response.data.data[0].nomorSeri),
            setKeterangan(response.data.data[0].keterangan),
            setTipeAsset(response.data.data[0].tipeAsset),
            setJumlah(response.data.data[0].jumlah),
            setImage(response.data.data[0].image),
            setHargaSewa(response.data.data[0].hargaSewa),
            setLokasi(response.data.data[0].lokasi)
            )
        )
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
         axios
            .get("http://localhost:3001/api/tipeasset/search/" + tipeAsset, {
                    auth: {
                        username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                        password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                    }
                })
            .then((res) => setKategori(res.data.data[0].keterangan))
            .catch((err) => console.log(err))
    }, [tipeAsset])

    return (
        <div className="container-fluid g-0 content">
            <div className="row">
                <div className="col">
                    <Header/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="container-fluid d-flex justify-content-center align-item-center mt-3 mb-5">
                        <div className="card p-4 card-product-product">
                            <div className="row">
                                <div className="col-auto">
                                    <div className="card card-image-product">
                                        <img src={image} alt="product" className="image-product-product"></img>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="card card-info-product-product">
                                        <h5 className="header-info-product-product">{nama}</h5>
                                        <p className="p-info-product-product">Merk : {merk}</p>
                                        <p className="p-info-product-product">Nomor Seri : {nomorSeri}</p>
                                        <p className="p-info-product-product">Keterangan : {keterangan}</p>
                                        <p className="p-info-product-product">Jumlah : {jumlah}</p>
                                        <p className="p-info-product-product">Kategori : {kategori}</p>
                                    </div>
                                </div> 
                            </div>
                            <div className="row mt-3">
                                <div className="col-auto">
                                    <div className="card card-info-product-keterangan">
                                        <h6>Keterangan: </h6>
                                        <p className="lead keterangan">Harga Sewa yang dicantumkan merupakan harga sewa berdasarkan lokasi alat, harga sewa belum termasuk biaya mobilisasi, demobilisasi dan PPN 11%, 
                                        untuk mengetahui harga sewa dan syarat & ketentuan sewa peralatan, 
                                        silahkan untuk melakukan permintaan penawaran harga dengan menekan tombol sewa.</p>
                                        <div className="dropdown">
                                            <button className="btn dropdown-toggle hargasewa" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                Harga
                                            </button>
                                            <ul className="dropdown-menu hargasewa" aria-labelledby="dropdownMenuButton1">
                                                <li><p className="dropdown-item lead hargasewa">{lokasi} - Rp.{hargaSewa.toLocaleString("id-ID")}</p></li>
                                                <li><p className="dropdown-item lead hargasewa">Lainnya - Ajukan Kuotasi</p></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Link to={`/penyewaan/${no}`} className="btn btn-success btn-addtocart-product">Sewa</Link>  
                                    </div>
                                </div>
                            </div>
                        </div>
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