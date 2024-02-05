import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../Main/header";
import { Sidebar } from "../Main/sidebar";
import './detail.css';

function Detail() {
  const { no } = useParams();
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
  });

  return (
    <div className="container-fluid g-0">
      <div className="row">
        <div className="col-auto sidebar">
          <Sidebar />
        </div>
        <div className="col">
            <Header></Header>
            <div className="container-fluid g-0 p-3">
            <h5 className="text-center mb-3"><b>{nama} - {nomorSeri}</b></h5>
            <div className="d-flex justify-content-center">
              <div className="card p-3" style={{width: 940, height: 480}}>
                <img src={image} alt="image-equipment" className="image-equipment-detail" style={{width: "100%", height: "100%"}}></img>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="card p-3 mt-3" style={{width: 940}}>
                <form>
                  <label htmlFor="nama" className="form-label">
                    Nama :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama"
                    value={nama}
                    readOnly
                  ></input>
                  <label htmlFor="merk" className="form-label">
                    Merk :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="merk"
                    value={merk}
                    readOnly
                  ></input>
                  <label htmlFor="nomorSeri" className="form-label">
                    Nomor Seri :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomorSeri"
                    value={nomorSeri}
                    readOnly
                  ></input>
                  <label htmlFor="nomorAlat" className="form-label">
                    Nomor Alat :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomorAlat"
                    value={nomorAlat}
                    readOnly
                  ></input>
                  <label htmlFor="nomorAlat" className="form-label">
                    Nomor Stok :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomorAlat"
                    value={noStok}
                    readOnly
                  ></input>
                  <label htmlFor="nomorAlat" className="form-label">
                    Warna :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomorAlat"
                    value={warna}
                    readOnly
                  ></input>
                  <label htmlFor="keterangan" className="form-label">
                    Keterangan :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="keterangan"
                    value={keterangan}
                    readOnly
                  ></input>
                  <label htmlFor="tipeAsset" className="form-label">
                    Tipe Asset :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama"
                    value={tipeAsset}
                    readOnly
                  ></input>
                  <label htmlFor="jumlah" className="form-label">
                    Jumlah :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="jumlah"
                    value={jumlah}
                    readOnly
                  ></input>
                  <label className="form-label" htmlFor="hargaSewa">Harga Sewa :</label>
                  <input className="form-control" type="text" id="hargaSewa" value={hargaSewa} onChange={(event) => setHargaSewa(event.target.value)} readOnly></input>
                  <label className="form-label" htmlFor="lokasi">Lokasi :</label>
                  <input className="form-control" type="text" id="lokasi" value={lokasi} onChange={(event) => setLokasi(event.target.value)} readOnly></input>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
