import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Main/header";
import { Sidebar } from "../Main/sidebar";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import { handleErrMsg } from "../../function/handleErrMsg";

function Update() {
  //Get a Variable for Equipment
  const { no } = useParams();
  const [equipment, setEquipment] = useState([]);
  const [nama, setNama] = useState("");
  const [merk, setMerk] = useState("");
  const [nomorSeri, setNomorSeri] = useState("");
  const [nomorAlat, setNomorAlat] = useState("");
  const [noStok, setNoStok] = useState("");
  const [warna, setWarna] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tipeAsset, setTipeAsset] = useState();
  const [jumlah, setJumlah] = useState();
  const [image, setImage] = useState(null);
  const [hargaSewa, setHargaSewa] = useState(0);
  const [lokasi, setLokasi] = useState("");
  const [kategori, setKategori] = useState([]);
  const axiosPrivate = useInterceptorRefreshToken();
  const [errMsg, setErrMsg] = useState("");

  //Variable for a navigate links
  const Navigate = useNavigate();

  useEffect(() => {
    setErrMsg('');
  }, [nama, merk, nomorSeri, nomorAlat, noStok, warna, keterangan, tipeAsset, jumlah, image, hargaSewa, lokasi, kategori])

  //Variable to handle when there's uploaded new image
  const handleImageOnchange = (event) => {
    setImage(event.target.files[0]);
  }

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
          setNomorAlat(response.data.data[0].nomorAlat),
          setNoStok(response.data.data[0].noStok),
          setWarna(response.data.data[0].warna),
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
        .get("http://localhost:3001/api/tipeasset/list", {
            auth: {
                username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            }
        })
        .then((res) => (setKategori(res.data.data)))
        .catch((err) => console.log(err))
  }, [])


  function handleUpdate(event) {
    event.preventDefault();
    axiosPrivate
      .patch("http://localhost:3001/api/equipment/update/" + no, {
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
        console.log(res);
        Navigate("/equipment/main");
      })
      .catch((err) => {
        switch (err.response.data.status) {
          case 400:
            switch (err.response.data.message) {
              case "Input Kosong":
                setErrMsg('Kolom masukkan data tidak boleh dikosongkan');
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-auto sidebar">
          <Sidebar/>
        </div>
        <div className="col">
          <Header></Header>
          <div className="container-fluid g-0 p-3">
            <h5 style={{fontWeight: 700, textAlign: "center"}}>Formulir Mengubah Data Peralatan & Mesin</h5>
            <form onSubmit={handleUpdate}>
              <div className="card p-3 mt-3">
                {handleErrMsg(errMsg)}
                <label htmlFor="Nama" className="form-label">
                  Nama :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="Nama"
                  value={nama}
                  onChange={(event) => setNama(event.target.value)}
                ></input>
                <label htmlFor="Merk" className="form-label">
                  Merk :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="Merk"
                  value={merk}
                  onChange={(event) => setMerk(event.target.value)}
                ></input>
                <label htmlFor="NomorSeri" className="form-label">
                  Nomor Seri :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="NomorSeri"
                  value={nomorSeri}
                  onChange={(event) => setNomorSeri(event.target.value)}
                ></input>
                <label htmlFor="NomorAlat" className="form-label">
                  Nomor Alat :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="NomorAlat"
                  value={nomorAlat}
                  onChange={(event) => setNomorAlat(event.target.value)}
                ></input>
                <label htmlFor="nomorStok" className="form-label">
                  Nomor Stok :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="nomorStok"
                  value={noStok}
                  onChange={(event) => setNoStok(event.target.value)}
                ></input>
                <label htmlFor="warna" className="form-label">
                  Warna :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="warna"
                  value={warna}
                  onChange={(event) => setWarna(event.target.value)}
                ></input>
                <label htmlFor="Keterangan" className="form-label">
                  Keterangan :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="Keterangan"
                  value={keterangan}
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
                  value={jumlah}
                  onChange={(event) => setJumlah(event.target.value)}
                ></input>
                <label htmlFor="preview" className="form-label">Preview</label>
                <div className="card">
                  <img src={image} className="preview"></img>
                </div>
                <input type="file" className="form-control" id="image" onChange={handleImageOnchange}></input>
                <label className="form-label" htmlFor="hargaSewa">Harga Sewa :</label>
                <input className="form-control" type="text" id="hargaSewa" value={hargaSewa} onChange={(event) => setHargaSewa(event.target.value)}></input>
                <label className="form-label" htmlFor="lokasi">Lokasi :</label>
                <input className="form-control" type="text" id="lokasi" value={lokasi} onChange={(event) => setLokasi(event.target.value)}></input>
              </div>
              <button className="btn btn-primary mt-3"><i class="fa-solid fa-pen-to-square update"></i>&emsp;Ubah</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
