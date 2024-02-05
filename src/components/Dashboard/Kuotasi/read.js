import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import './read.css';

export function Read() {
    const [Kuotasi, setKuotasi] = useState([]);
    const axiosPrivate = useInterceptorRefreshToken();

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/kuotasi/list")
            .then((res) => setKuotasi(res.data.data))
            .catch((err) => console.log(err));
    })

    const handleStatus = (status) => {
        if(status === "Perlu Tindak Lanjut")
        {
            return (<button className="btn btn-warning">{status}</button>);
        }
        else if(status === "Disetujui")
        {
            return (<button className="btn btn-success">{status}</button>)
        }
    }

    return ( 
        <div className="container-fluid g-0 p-3">
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nomor Kuotasi</th>
                        <th scope="col">Nama Lengkap</th>
                        <th scope="col">Nama Perusahaan</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tanggal Awal Sewa</th>
                        <th scope="col">Tanggal Berakhir Sewa</th>
                        <th scope="col">Alamat Proyek</th>
                        <th scope="col">Status</th>
                        <th scope="col" colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Kuotasi.map((data, i) => (
                        <tr>
                            <td>{data.nomorKuotasi}</td>
                            <td>{data.namaLengkap}</td>
                            <td>{data.namaPerusahaan}</td>
                            <td>{data.email}</td>
                            <td>{format(new Date(data.tanggalAwalSewa),'dd-MM-yy')}</td>
                            <td>{format(new Date(data.tanggalBerakhirSewa), 'dd-MM-yy')}</td>
                            <td>{data.alamatProyek}</td>
                            <td>{handleStatus(data.status)}</td>
                            <td><Link to={`/kuotasi/detail/${data.nomorKuotasi}`}><i className="fa-solid fa-circle-info"></i></Link></td>
                            <td><Link to={`/dashboard/kuotasi/generate/kontraksewa/${data.nomorKuotasi}`}><i class="fa-solid fa-file-pdf"></i></Link></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}