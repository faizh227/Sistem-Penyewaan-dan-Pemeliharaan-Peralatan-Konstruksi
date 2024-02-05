import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";

export function Read() {
    const [kategori, setKategori] = useState([]);
    const axiosPrivate = useInterceptorRefreshToken();

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/tipeasset/list", {
                auth: {
                    username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                    password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                }
            })
            .then((res) => (setKategori(res.data.data)))
            .catch((err) => console.log(err))
    }, [])

    const handleDelete = async(tipeAsset) => {
        try {
            await axiosPrivate.delete("http://localhost:3001/api/tipeasset/delete/" + tipeAsset);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col">
                    <Link className="btn btn-success" to={"/dashboard/kategori/add"}><i class="fa-solid fa-plus"></i>&emsp;Tambah Tipe Asset</Link>
                    <table className="table table-striped table-bordered table-hover mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Tipe Asset</th>
                                <th scope="col">Keterangan</th>
                                <th scope="col" colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kategori.map((data) => (
                                <tr>
                                    <td>{data.tipeAsset}</td> 
                                    <td>{data.keterangan}</td>
                                    <td><Link to={`/dashboard/kategori/update/` + data.tipeAsset}><i class="fa-solid fa-pen-to-square add"></i></Link>
                                    <Link className="mx-3" onClick={(e) => handleDelete(data.tipeAsset)}><i class="fa-solid fa-trash-can add"></i></Link></td>
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