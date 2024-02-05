import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import './read.css';

function Read() {
  const [Equipment, setEquipment] = useState([]);
  const axiosPrivate = useInterceptorRefreshToken();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/equipment/list" , {
            auth: {
                username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            }
        })
      .then((res) => setEquipment(res.data.data))
      .catch((err) => console.log(err));  
  }, []);

  const handleDelete = async (no) => {
    try {
      await axiosPrivate.delete("http://localhost:3001/api/equipment/delete/" + no);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container-fluid">
      <Link to="/equipment/add" className="btn btn-success">
        <i class="fa-solid fa-plus"></i>&emsp;Tambah Peralatan & Mesin Baru
      </Link>
      <table className="table table-striped table-bordered table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama</th>
            <th scope="col">Merk</th>
            <th scope="col">Nomor Seri</th>
            <th scope="col">Nomor Alat</th>
            <th scope="col">Nomor Stok</th>
            <th scope="col">Warna</th>
            <th scope="col">Keterangan</th>
            <th scope="col">Tipe Asset</th>
            <th scope="col">Status</th>
            <th scope="col">Jumlah</th>
            <th scope="col">Harga Sewa</th>
            <th scope="col">Lokasi</th>
            <th scope="col" colSpan={3} style={{width: 180}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Equipment.map((data, i) => (
            <tr scope="row" key={i}>
              <th>{data.no}</th>
              <td>{data.nama}</td>
              <td>{data.merk}</td>
              <td>{data.nomorSeri}</td>
              <td>{data.nomorAlat}</td>
              <td>{data.noStok}</td>
              <td>{data.warna}</td>
              <td>{data.keterangan}</td>
              <td>{data.tipeAsset}</td>
              <td>{data.status}</td>
              <td>{data.jumlah}</td>
              <td>Rp. {data.hargaSewa.toLocaleString("id-ID")}</td>
              <td>{data.lokasi}</td>
              <td>
                <Link to={`/equipment/update/${data.no}`}>
                  <i class="fa-solid fa-pen-to-square add"></i>
                </Link>
                <Link
                  onClick={(e) => handleDelete(data.no)}
                  className="mx-3"
                >
                  <i class="fa-solid fa-trash-can add"></i>
                </Link>
                <Link to={`/equipment/detail/${data.no}`}>
                  <i className="fa-solid fa-circle-info add"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Read;
