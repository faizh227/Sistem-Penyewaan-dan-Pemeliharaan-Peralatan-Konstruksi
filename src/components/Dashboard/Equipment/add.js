import { useEffect, useState } from "react";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Main/header";
import { Sidebar } from "../Main/sidebar";
import axios from "axios";
import { handleErrMsg } from "../../function/handleErrMsg";

function Add() {
  const [nama, setNama] = useState("");
  const [merk, setMerk] = useState("");
  const [nomorSeri, setNomorSeri] = useState("");
  const [nomorAlat, setNomorAlat] = useState("");
  const [noStok, setNoStok] = useState("");
  const [warna, setWarna] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tipeAsset, setTipeAsset] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [image, setImage] = useState(null);
  const [hargaSewa, setHargaSewa] = useState(0);
  const [kategori, setKategori] = useState([]);
  const [lokasi, setLokasi] = useState("");
  const Navigate = useNavigate();
  const axiosPrivate = useInterceptorRefreshToken();
  const [errMsg, setErrMsg] = useState('');
  
  const uploadImage = (event) => {
    setImage(event.target.files[0]);
  }

  useEffect(() => {
    setErrMsg('');
  }, [nama, merk, nomorSeri, nomorAlat, noStok, warna, keterangan, tipeAsset, jumlah, image, hargaSewa, kategori, lokasi])

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

  function handleSubmit(event) {
    event.preventDefault();
    axiosPrivate
      .post("http://localhost:3001/api/equipment/add", {
        nama,
        merk,
        nomorSeri,
        nomorAlat,
        noStok,
        warna,
        keterangan,
        tipeAsset,
        jumlah,
        image,
        hargaSewa,
        lokasi
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        Navigate("/equipment/main");
      })
      .catch((err) => {
        switch (err.response.data.status) {
          case 400:
            switch (err.response.data.message) {
              case "Input kosong":
                setErrMsg('Kolom masukkan data tidak boleh dikosongkan');
                break;
              case "Gambar Tidak Terpilih":
                setErrMsg('Masukkan gambar peralatan');
                break;
              case "Format tidak sesuai":
                setErrMsg('Masukkan data sesuai dengan format ketentuan');
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
      });
  }

  return (
    <div className="container-fluid g-0">
      <div className="row">
        <div className="col-auto sidebar">
          <Sidebar/>
        </div>
        <div className="col">
          <Header></Header>
          <div className="container-fluid g-0 p-3">
            <h5 style={{textAlign: "center", fontWeight: 700, marginBottom: 30}}>Formulir Tambah Peralatan & Mesin Baru</h5>
            <form onSubmit={handleSubmit} method="HTTP_METHOD" encType="multipart/form-data">
              <div className="card p-3">
                {handleErrMsg(errMsg)}
                <label htmlFor="Nama" className="form-label">
                  Nama :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="Nama"
                  onChange={(event) => setNama(event.target.value)}
                ></input>
                <label htmlFor="Merk" className="form-label">
                  Merk :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="Merk"
                  onChange={(event) => setMerk(event.target.value)}
                ></input>
                <label htmlFor="NomorSeri" className="form-label">
                  Nomor Seri :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="NomorSeri"
                  onChange={(event) => setNomorSeri(event.target.value)}
                ></input>
                <label htmlFor="NomorAlat" className="form-label">
                  Nomor Alat :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="NomorAlat"
                  onChange={(event) => setNomorAlat(event.target.value)}
                ></input>
                <label htmlFor="nomorStok" className="form-label">
                  Nomor Stok :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="nomorStok"
                  onChange={(event) => setNoStok(event.target.value)}
                ></input>
                <label htmlFor="warna" className="form-label">
                  Warna :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="warna"
                  onChange={(event) => setWarna(event.target.value)}
                ></input>
                <label htmlFor="Keterangan" className="form-label">
                  Keterangan :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="Keterangan"
                  onChange={(event) => setKeterangan(event.target.value)}
                ></input>
                <label htmlFor="TipeAsset" className="form-label">
                  Tipe Asset :
                </label>
                <select className="form-control" id="tipeAsset" name="tipeAsset" value={tipeAsset} onChange={(event) => setTipeAsset(event.target.value)}>
                  <option value="">Pilih tipe asset...</option>
                  {
                    kategori.map((data) => (
                      <option value={data.tipeAsset}>{data.keterangan}</option>
                    ))
                  }
                </select>
                <label htmlFor="Jumlah" className="form-label">
                  Jumlah :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="Jumlah"
                  onChange={(event) => setJumlah(event.target.value)}
                ></input>
                <label htmlFor="Image" className="form-label">Image :</label>
                <input className="form-control" type="file" id="Image" onChange={uploadImage}>
                </input>
                <label className="form-label" htmlFor="hargaSewa">Harga Sewa :</label>
                <input className="form-control" type="text" id="hargaSewa" onChange={(event) => setHargaSewa(event.target.value)}></input>
                <label className="form-label" htmlFor="lokasi">Lokasi :</label>
                <input className="form-control" type="text" id="lokasi" onChange={(event) => setLokasi(event.target.value)}></input>
              </div>
              <button className="btn btn-danger mt-3"><i class="fa-solid fa-plus"></i>&emsp;Tambah</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
