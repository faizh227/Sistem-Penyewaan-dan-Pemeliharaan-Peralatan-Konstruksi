import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Add from "../src/components/Dashboard/Equipment/add";
import Update from "../src/components/Dashboard/Equipment/update";
import Detail from "../src/components/Dashboard/Equipment/detail.";
import Dashboard from "./components/Dashboard/Main/dashboard";
import EquipmentMain from "../src/components/Dashboard/Equipment/equipmentmain";
import Home from "../src/components/Homepage/home";
import Login from "../src/components/Homepage/login";
import Registrasi from "./components/Homepage/registrasi";
import Product from "../src/components/Homepage/product";
import AllProduct from "../src/components/Homepage/allproduct";
import Penyewaan from "../src/components/Homepage/penyewaan";
import { Main as KuotasiMain } from "../src/components/Dashboard/Kuotasi/main";
import { Detail as KuotasiDetail } from "../src/components/Dashboard/Kuotasi/detail";
import { Form as KuotasiPenawaranHarga } from "../src/components/Dashboard/Kuotasi/form";
import { Main as PenyewaanMain } from "../src/components/Dashboard/Rental/main";
import { Detail as PenyewaanDetail } from "../src/components/Dashboard/Rental/detail";
import { List as PenyewaanList } from "../src/components/Homepage/list";
import { Detail as DetailSewa } from "./components/Homepage/detail";
import { Main as MaintenanceMain } from "./components/Dashboard/Maintenance/main";
import { Add as MaintenanceAdd } from "./components/Dashboard/Maintenance/add";
import { Update as MaintenanceUpdate } from "./components/Dashboard/Maintenance/update";
import { Detail as MaintenanceDetail } from "./components/Dashboard/Maintenance/detail";
import { Add as KerusakanAdd } from "./components/Dashboard/Maintenance/Kerusakan/add";
import { Update as KerusakanUpdate } from "./components/Dashboard/Maintenance/Kerusakan/update";
import { Pembayaran as PembayaranDetail } from "./components/Homepage/pembayaran";
import { Pay as PaymentPage } from "./components/Homepage/pay";
import { Main as DashboardPaymentMain } from "./components/Dashboard/Pembayaran/main";
import { Detail as DashboardPaymentDetail } from "./components/Dashboard/Pembayaran/detail";
import { Invoice as UploadInvoice } from "./components/Dashboard/Rental/invoice";
import { KontrakKerja as UploadKontrakKerja } from "./components/Dashboard/Rental/kontrakkerja";
import { Profile as ProfileUser} from "./components/Homepage/profile";
import { Main as KategoriMain} from "./components/Dashboard/tipeAsset/main";
import { Add as KategoriAdd } from "./components/Dashboard/tipeAsset/add";
import { Update as KategoriUpdate } from "./components/Dashboard/tipeAsset/update";
import { Generate as GenerateKontrakSewa } from "./components/Dashboard/Kuotasi/generate";
import { Pengiriman as UploadPengiriman } from "./components/Dashboard/Rental/pengiriman";
import { SerahTerima as UploadSerahTerima } from "./components/Dashboard/Rental/serahterima";
import { Form as FormPengirimanBarang } from "./components/Dashboard/Rental/pengiriman/form";
import { Generate as GenerateInvoice } from "./components/Dashboard/Rental/invoice/generate";
import { Generate as GenerateSuratPengiriman } from "./components/Dashboard/Rental/pengiriman/generate";
import { Generate as GenerateSuratSerahTerima } from "./components/Dashboard/Rental/serahterima/generate";
import { Generate as GenerateFormPemeliharaan } from "./components/Dashboard/Maintenance/generate";
import RequireAuth from "./components/function/requireAuth";
import PersistLogin from "./components/function/persistLogin";

function Router() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route element={<PersistLogin />}>
            {/**Public Routes */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Registrasi/>}></Route>
            <Route path="/product/:no" element={<Product/>}></Route>
            <Route path="/allproduct/:tipeAsset" element={<AllProduct/>}></Route>
          
            {/**User routes  */}
            <Route element={<RequireAuth allowedLevel={1}/>}>
              <Route path="/penyewaan/list/:username" element={<PenyewaanList/>}></Route>
              <Route path="/penyewaan/detail/:nomorKuotasi" element={<DetailSewa/>}></Route>
              <Route path="/pembayaran/detail/:order_id" element={<PembayaranDetail/>}></Route>
              <Route path="/pembayaran/page/:order_id" element={<PaymentPage/>}></Route>
              <Route path="/penyewaan/:no" element={<Penyewaan/>}></Route>
              <Route path="/profile/:username" element={<ProfileUser/>}></Route>
            </Route>

            {/**Admin Routes */}
            <Route element={<RequireAuth allowedLevel={2}/>}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/equipment/main" element={<EquipmentMain />}></Route>
              <Route path="/equipment/add" element={<Add />}></Route>
              <Route path="/equipment/update/:no" element={<Update />}></Route>
              <Route path="/equipment/detail/:no" element={<Detail />}></Route>
              <Route path="/dashboard/kategori/main" element={<KategoriMain/>}></Route>
              <Route path="/dashboard/kategori/add" element={<KategoriAdd/>}></Route>
              <Route path="/dashboard/kategori/update/:tipeAsset" element={<KategoriUpdate/>}></Route>
              <Route path="/kuotasi" element={<KuotasiMain/>}></Route>
              <Route path="/kuotasi/detail/:nomorKuotasi" element={<KuotasiDetail/>}></Route>
              <Route path="/kuotasi/form/send/penawaranharga/:nomorKuotasi" element={<KuotasiPenawaranHarga/>}></Route>
              <Route path="/dashboard/kuotasi/generate/kontraksewa/:nomorKuotasi" element={<GenerateKontrakSewa/>}></Route>
              <Route path="/dashboard/penyewaan/main" element={<PenyewaanMain/>}></Route>
              <Route path="/dashboard/penyewaan/detail/:nomorKuotasi" element={<PenyewaanDetail/>}></Route>
              <Route path="/dashboard/maintenance/main" element={<MaintenanceMain/>}></Route>
              <Route path="/dashboard/maintenance/add" element={<MaintenanceAdd/>}></Route>
              <Route path="/dashboard/maintenance/update/:no" element={<MaintenanceUpdate/>}></Route>
              <Route path="/dashboard/maintenance/detail/:no" element={<MaintenanceDetail/>}></Route>
              <Route path="/dashboard/maintenance/kerusakan/add/:no" element={<KerusakanAdd/>}></Route>
              <Route path="/dashboard/maintenance/kerusakan/update/:id" element={<KerusakanUpdate/>}></Route>
              <Route path="/dashboard/maintenance/generate/form/:no" element={<GenerateFormPemeliharaan/>}></Route>
              <Route path="/dashboard/pembayaran/main" element={<DashboardPaymentMain/>}></Route>
              <Route path="/dashboard/pembayaran/detail/:order_id" element={<DashboardPaymentDetail/>}></Route>
              <Route path="/dashboard/penyewaan/upload/invoice/:order_id" element={<UploadInvoice/>}></Route>
              <Route path="/dashboard/penyewaan/upload/kontrakkerja/:order_id" element={<UploadKontrakKerja/>}></Route>
              <Route path="/dashboard/penyewaan/upload/pengiriman/:order_id" element={<UploadPengiriman/>}></Route>
              <Route path="/dashboard/penyewaan/upload/serahterima/:order_id" element={<UploadSerahTerima/>}></Route>
              <Route path="/dashboard/penyewaan/invoice/generate/:order_id" element={<GenerateInvoice/>}></Route>
              <Route path="/dashboard/penyewaan/form/pengiriman/:order_id" element={<FormPengirimanBarang/>}></Route>
              <Route path="/dashboard/penyewaan/pengiriman/generate" element={<GenerateSuratPengiriman/>}></Route>
              <Route path="/dashboard/penyewaan/serahterima/generate/:order_id" element={<GenerateSuratSerahTerima/>}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
