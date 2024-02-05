import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link} from "react-router-dom";
import './home.css';

function Home() { 
    const [tipeAsset, setTipeAsset] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/tipeasset/list", {
                withCredentials: true,
                auth: {
                    username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                    password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                }
            })
            .then((res) => (setTipeAsset(res.data.data)))
            .catch((err) => console.log(err))
    }, [])

    function checkKategori(keterangan) {
        switch (keterangan) {
            case "Welding Machine":
                return "/image/equipment/Welding%20Machine.png"
                break;
            case "Backhoe Loader" :
                return "/image/equipment/Backhoe%20Loader.png"
                break;
            case "Total Station" :
                return;
                break;
            case "Wheel Loader" :
                return;
                break;
            case "Multi Gas Detector" :
                return;
                break;
            case "Generator" :
                return;
                break;
            default:
                break;
        }
    }

    return (
        <div className="g-0 container-fluid">
            <div className="row">
                <div className="col">
                    <Header />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="container-fluid g-0">
                        <div className="row">
                            <div className="col">
                                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src="/backgroundimage.jpg" className="d-block w-100" alt="..."></img>
                                            <div className="overlay background img"></div>
                                            <div className="carousel-caption d-none d-md-block">
                                                <h1 className="header caption">Saling Menguntungkan Demi Tercapainya Hasil Yang Berkualitas, Schedule Yang Tercapai dan Safety, Health and Environment Yang Berhasil</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container mt-4">
                            <div className="row">
                                <div className="col">
                                    <h5 className="text-center home">Tentang Kami</h5>
                                    <div className="row mt-5">
                                        <div className="col">
                                            <p className="lead">Sejak 2009, Kami berdiri dengan visi utama untuk menjembatani antara pelanggan dan kebutuhan dalam pengadaan barang dan material peralatan yang berkualitas baik domestik maupun international yang dibutuhkan untuk menyelesaikan berbagai proyek.
                                            Seiring berjalannya waktu, Kami mengalami perkembangan yang signifikan dengan memperluas jangkauan layanannya dengan menyediakan
                                            jasa penyewaan peralatan bidang konstruksi, mekanikal dan E & I  demi mendukung pelaksanaan berbagai proyek. 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h5 className="text-center home">Mengapa Memilih Kami</h5>  
                                    <div className="row mt-5">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <i className="fa-solid icon-home fa-circle-check"></i>     
                                                </div>
                                                <div className="col section-home-2">
                                                    <h6 className="section-home-2-header">Produk yang Berkualitas</h6>
                                                    <p className="lead">Kami berkomitmen menjadi Perusahaan Nasional yang dapat diandalkan dalam memasarkan dan menyediakan produk-produk berkualitas baik dalam negeri maupun luar negeri</p>                                             
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <i className="fa-solid icon-home fa-award"></i>
                                                </div>
                                                <div className="col section-home-2">
                                                    <h6 className="section-home-2-header">Handal dalam Penyewaan</h6>
                                                    <p className="lead">Kami merupakan Perusahaan yang dapat diandalkan dalam jasa penyewaan peralatan. Dengan berbagai macam peralatan yang terjamin kualitasnya demi menunjang kebutuhan Anda dalam pelaksanaan proyek</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <i className="fa-solid icon-home fa-people-group"></i>
                                                </div>
                                                <div className="col section-home-2-2-1">
                                                    <h6 className="section-home-2-header">Sumber Daya Manusia yang Disiplin dan Berdedikasi Tinggi</h6>
                                                    <p className="lead">Tim kami berkomitmen dalam memberikan solusi yang terbaik bagi kebutuhan Anda dalam pelaksanaan proyek</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <i className="fa-solid icon-home fa-handshake"></i>
                                                </div>
                                                <div className="col section-home-2-2-2">
                                                    <h6 className="section-home-2-header">Komitmen terhadap Kualitas dan Kepuasan Pelanggan</h6>
                                                    <p className="lead">Kami selalu berkomitmen dalam mengutamakan kualitas produk dan layanannya yang dapat memberikan kepuasan pelanggan</p>        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h5 className="text-center home">Produk Kami</h5>
                                    <div className="row
                                        mt-4
                                        row-cols-xxl-2
                                        row-cols-xl-2
                                    ">
                                        {
                                            tipeAsset.map((data,i) => (
                                                <div className="col mt-4 d-flex justify-content-center" key={i}>
                                                    <Link className="card category home" to={"/allproduct/"+data.tipeAsset}>
                                                        <img src={checkKategori(data.keterangan)} alt={data.keterangan} className="img-kategori-home"></img>
                                                        <p className="lead mt-3 text-center category home">{data.keterangan}</p>
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h5 className="text-center home">Proses Sewa</h5>
                                    <p className="lead text-center">Dibawah ini kami akan menjelaskan tahap-tahapan yang perlu anda lalui dalam proses penyewaan peralatan konstruksi, adapun tahap-tahap tersebut dibagi menjadi 6 tahap yang ditampilkan berikut ini:</p>
                                    <h6 className="header6-proses-sewa mt-3 text-center"><b>Kuotasi</b></h6>
                                    <p className="lead text-center">Di tahap kuotasi, anda dapat mengajukan penawaran harga (kuotasi) terhadap peralatan yang ingin anda sewa. Pengajuan untuk penawaran harga sewa akan dinotifikasi ke perusahaan, setelah ditetapkan penawaran harga sewa, anda akan diberikan notifikasi melalui email yang terdaftar di PSI untuk mengetahui harga sewa yang diberikan, untuk melanjutkan proses negosiasi harga silahkan untuk menghubungi kontak yang tertera di kolom <b style={{fontWeight: 700}}>Kontak Kami</b>.</p>
                                    <h6 className="header6-proses-sewa mt-3 text-center"><b>Kontrak</b></h6>
                                    <p className="lead text-center">Di tahap kontak, dengan menandatangani dokumen kontrak sewa anda setuju dengan syarat dan ketentuan berlaku selama masa sewa-menyewa peralatan konstruksi ini berlangsung.</p>
                                    <h6 className="header6-proses-sewa mt-3 text-center"><b>Pengiriman</b></h6>
                                    <p className="lead text-center">Di tahap pengiriman, dengan menandatangani surat pengiriman barang anda setuju dengan ketentuan pengiriman yang tertera di dokumen kontrak sewa.</p>
                                    <h6 className="header6-proses-sewa mt-3 text-center"><b>Aktif</b></h6>
                                    <p className="lead text-center">Di tahap aktif, masa sewa akan aktif ketika tanggal memasuki periode aktif sewa dan barang dikirimkan pada hari itu juga. Perlu diketahui seminggu sebelum masa sewa berakhir, anda akan dinotifikasi oleh perusahaan untuk menandatangani surat serah terima dan mengembalikan peralatan konstruksi pada hari akhir sewa.</p>
                                    <h6 className="header6-proses-sewa mt-3 text-center"><b>Pembayaran</b></h6>
                                    <p className="lead text-center">Di tahap pembayaran, anda dapat membayar melalui aplikasi ini menggunakan beberapa metode pembayaran yang akan disediakan oleh <b style={{fontWeight: 700}}>Midtrans Payment Gateway</b>, untuk mengetahui detail pembayaran dapat melihat invoice pada halaman detail penyewaan melalui daftar riwayat sewa.</p>
                                    <h6 className="header6-proses-sewa mt-3 text-center"><b>Pengembalian</b></h6>
                                    <p className="lead text-center">Di tahap pengembalian, perusahaan akan menyatakan alat telah dikembalikan dan pembayaran sudah dilunaskan.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">   
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Home;