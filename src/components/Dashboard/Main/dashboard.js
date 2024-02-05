import { useEffect, useState } from "react";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import Header from "./header";
import { Sidebar } from "./sidebar";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import { getNameMonth } from "../../function/getNameMonth";
import './dashboard.css';

function DashboardPage() {
  const [kuotasi, setKuotasi] = useState([]);
  const [penyewaan, setPenyewaan] = useState([]);
  const [pembayaran, setPembayaran] = useState([]);
  const bulanNow = getMonth(new Date());
  const yearNow = getYear(new Date());
  const [countBulanKuotasi, setCountBulanKuotasi] = useState(0);
  const [countBulanPenyewaan, setCountBulanPenyewaan] = useState(0);
  const [countRevenueBulan, setCountRevenueBulan] = useState(0);
  const [countRevenueTahun, setCountRevenueTahun] = useState(0);
  const axiosPrivate = useInterceptorRefreshToken();
  useEffect(() => {
    axiosPrivate.get("http://localhost:3001/api/kuotasi/list")
      .then((res) => setKuotasi(res.data.data))
      .catch((err) => console.log(err)) 

    axiosPrivate.get("http://localhost:3001/api/penyewaan/list")
      .then((res) => setPenyewaan(res.data.data))
      .catch((err) => console.log(err))

    axiosPrivate.get("http://localhost:3001/api/pembayaran/list")
      .then((res) => (setPembayaran(res.data.data)))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
     
  })

  useEffect(() => {
    const tempCountBulanKuotasi = kuotasi.filter((data) => {
      return bulanNow === getMonth(new Date(data.tanggalKuotasi));
    })
    const tempCountBulanPenyewaan = penyewaan.filter((data) => {
      return bulanNow === getMonth(new Date(data.tanggalEntry));
    })
    const tempCountRevenueBulan = pembayaran.reduce((total,data) => {
      if(bulanNow === getMonth(new Date(data.tanggalEntry)) && data.status === "settlement") {
        return total + data.hargaTotal;
      }
      return total;
    }, 0)
    const tempCountRevenueTahun = pembayaran.reduce((total,data) => {
      if(yearNow === getYear(new Date(data.tanggalEntry)) && data.status === "settlement") {
        return total + data.hargaTotal;
      }
      return total;
    }, 0)
    setCountBulanKuotasi(tempCountBulanKuotasi.length);
    setCountBulanPenyewaan(tempCountBulanPenyewaan.length);
    setCountRevenueBulan(tempCountRevenueBulan.toLocaleString("id-ID"));
    setCountRevenueTahun(tempCountRevenueTahun.toLocaleString("id-ID"));
  }, [kuotasi, penyewaan, pembayaran])

  return (
    <div className="container-fluid g-0">
      <div className="row">
        <div className="col-auto sidebar">
          <Sidebar/>
        </div>
        <div className="col">
          <Header></Header>
          <div className="container-fluid g-0 dashboard p-3">
            <div className="row">
              <div className="col-auto">
                <div className="card text-center">
                  <h6>Kuotasi Bulan {getNameMonth(bulanNow)}</h6>
                  <b>{countBulanKuotasi}</b>
                </div>
              </div>
              <div className="col">
                <div className="card text-center">
                  <h6>Penyewaan Bulan {getNameMonth(bulanNow)}</h6>
                  <b>{countBulanPenyewaan}</b>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-auto">
                  <div className="card text-center">
                    <h6>Revenue Bulan {getNameMonth(bulanNow)}</h6>
                    <b>Rp. {countRevenueBulan}</b>
                  </div>
              </div>
              <div className="col">
                  <div className="card text-center">
                    <h6>Revenue Tahun {yearNow}</h6>
                    <b>Rp. {countRevenueTahun}</b>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;