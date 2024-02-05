import { format } from "date-fns";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import './read.css';

export function Read() {
    const [maintenance, setMaintenance] = useState([]);
    const axiosPrivate = useInterceptorRefreshToken();

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/maintenance/list")
            .then((res) => setMaintenance(res.data.data))
            .catch((err) => console.log(err))
    })

    const handleStatus = (status) => {
        if (status === "Pemeliharaan Telah Selesai") {
            return (<button className="btn btn-success">{status}</button>)
        }
        else if (status === "Perlu Tindak Lanjut") {
            return (<button className="btn btn-warning">{status}</button>)
        }
    }

    const handleDelete = async (no) => {
        try {
            await axiosPrivate.delete("http://localhost:3001/api/maintenance/delete/" + no);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    const handleConfirmationStatus = async (no, nomorSeri) => {
        try {
            await axiosPrivate.patch("http://localhost:3001/api/maintenance/confirmation/status/" + no + "/" + nomorSeri);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container-fluid g-0 p-3">
            <Link to="/dashboard/maintenance/add" className="btn btn-success"><i class="fa-solid fa-plus"></i>&emsp;Tambah Pemeliharaan Peralatan & Mesin</Link>
            <table className="table table-striped table-bordered table-hover mt-3">
                <thead>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Pemohon</th>
                    <th>Bagian</th>
                    <th>Item</th>
                    <th>Merk/Tipe</th>
                    <th>Lain-Lain</th>
                    <th>Status</th>
                    <th>Form Pemeliharaan</th>
                    <th colspan={4}>Action</th>
                </thead>
                <tbody>
                    {maintenance.map((data,i) => (
                        <tr key={i}>
                            <td>{data.no}</td>
                            <td>{format(new Date(data.tanggal), 'dd-MMM-yy')}</td>
                            <td>{data.pemohon}</td>
                            <td>{data.bagian}</td>
                            <td>{data.item}</td>
                            <td>{data.nomorSeri}</td>
                            <td>{data.lainLain}</td>
                            <td>{handleStatus(data.status)}</td>
                            <td className="d-flex justify-content-center"><Link to={data.file} download><i className="fa-solid fa-download"></i></Link>
                            <Link to={`/dashboard/maintenance/generate/form/${data.no}`}><i className="fa-solid fa-file-pdf ms-5"></i></Link></td>
                            <td><Link to={`/dashboard/maintenance/detail/${data.no}`}><i className="fa-solid fa-circle-info add"></i></Link></td>
                            <td><Link onClick={(e) => handleConfirmationStatus(data.no, data.nomorSeri)}><i className="fa-solid fa-check"></i></Link></td>
                            <td><Link to={`/dashboard/maintenance/update/${data.no}`}><i className="fa-solid fa-pen-to-square add"></i></Link></td>
                            <td><Link onClick={(e) => handleDelete(data.no)}><i className="fa-solid fa-trash-can add"></i></Link></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}