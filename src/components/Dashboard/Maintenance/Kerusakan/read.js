import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import useInterceptorRefreshToken from "../../../hooks/useInterceptorRefreshToken";

export function Read() {
    const {no} = useParams();
    const [kerusakan, setKerusakan] = useState([]);
    const [sum, setSum] = useState(0);
    const axiosPrivate = useInterceptorRefreshToken();
    
    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/maintenance/kerusakan/" + no)
            .then((res) => (setKerusakan(res.data.data)))
            .catch((err) => console.log(err))
    })

    useEffect(() => {
        let tempSum = 0;

        kerusakan.map((data,i) => (
            tempSum = tempSum + data.biaya,
            setSum(tempSum)
        ))
    }, [kerusakan])

    const handleDelete = async (id) => {
        try {
            await axiosPrivate.delete("http://localhost:3001/api/maintenance/kerusakan/delete/" + id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container-fluid g-0">
            <Link to={`/dashboard/maintenance/kerusakan/add/${no}`} className="btn btn-success">
                <i class="fa-solid fa-plus"></i>&emsp;Tambah Daftar Kerusakan
            </Link>
            <table className="table table-striped table-bordered table-hover mt-3">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kerusakan</th>
                        <th>Usulan Pemeliharaan</th>
                        <th>Perkiraan Biaya</th>
                        <th>Keterangan</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {kerusakan.map((data,i) => (
                        <tr key={i}>
                            <td>{data.id}</td>
                            <td>{data.kerusakan}</td>
                            <td>{data.usulan}</td>
                            <td>{data.biaya}</td>
                            <td>{data.keterangan}</td>
                            <td><Link to={`/dashboard/maintenance/kerusakan/update/${data.id}`}><i class="fa-solid fa-pen-to-square add"></i></Link>
                            <Link className="mx-3" onClick={(e) => handleDelete(data.id)}><i class="fa-solid fa-trash-can add"></i></Link></td>
                        </tr>
                    ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={2}></th>
                        <th>Total</th>
                        <td>{sum}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}