//Setting Variable
//INITIALIZATION
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const path = require("path");
const db = require("./connection");
require('dotenv').config()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const fs = require('fs');
const Equipment = require('./modules/equipment');
const User = require('./modules/user');
const Kuotasi = require('./modules/kuotasi');
const Pemeliharaan = require('./modules/pemeliharaan');
const Kerusakan = require('./modules/kerusakan');
const Penyewaan = require('./modules/penyewaan');
const Pembayaran = require('./modules/pembayaran');
const TipeAsset = require('./modules/tipeAsset');

//RUN API
const app = express();
const port = 3001;
//CLASSES
const equipment = new Equipment(db);
const user = new User(db);
const kuotasi = new Kuotasi(db);
const pemeliharaan = new Pemeliharaan(db);
const kerusakan = new Kerusakan(db);
const penyewaan = new Penyewaan(db);
const pembayaran = new Pembayaran(db);
const tipeAsset = new TipeAsset(db);

//STORAGE IMAGE
const fileStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
})

//FILTER FILE IMAGE
const fileFilter = (req, file, callback) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
  {
    callback(null, true);
  }
  else
  {
    callback(null, false);
  }
}

//STORAGE KONTRAK SEWA, PENGIRIMAN, INVOICE DAN SERAH TERIMA
const orderIDFileStorage = multer.diskStorage({
  destination: function(req, file, callback) {
      const order_id = req.params.order_id;
      const userFolderPath = path.join(__dirname, 'private/penyewaan/order_id/' + order_id);

      if(!fs.existsSync(userFolderPath)) {
        fs.mkdirSync(userFolderPath, { recursive: true});
      }

      callback(null, 'private/penyewaan/order_id/' + order_id);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
})

//STORAGE FORM PEMELIHARAAN
const nomorFileStorage = multer.diskStorage({
  destination: function(req, file, callback) {
      const no = req.params.no;
      const userFolderPath = path.join(__dirname, 'private/pemeliharaan/form/no/' + no);

      if(!fs.existsSync(userFolderPath)) {
        fs.mkdirSync(userFolderPath, { recursive: true});
      }

      callback(null, 'private/pemeliharaan/form/no/' + no);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
})

//Setting Cors
const whitelist = ['https://www.yoursite.com', 'http://localhost:3001', 'http://localhost:3000','https://app.sandbox.midtrans.com/iris', 'https://app.midtrans.com', 'https://api.sandbox.midtrans.com'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed By CORS'));
    }
  },
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  preflightContinue: false,
}
//Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/public",express.static(path.join(__dirname, 'public')));
app.use("/private",express.static(path.join(__dirname,'private')));
const uploadImage = multer({storage: fileStorage, fileFilter: fileFilter});
const uploadFile = multer({storage: orderIDFileStorage});
const uploadFileForm = multer({storage: nomorFileStorage});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});


/****************************************************************
 *                            API
 ***************************************************************/
/** 
 * API Equipment
 * */

//API list equipment 
app.get("/api/equipment/list", (req, res) => {
  equipment.getList(req, res);
});

//API search equipment
app.get("/api/equipment/search/(:no)", (req, res) => {
  equipment.search(req, res);
});

//API Search equipment by tipe asset
app.get("/api/equipment/search/tipeAsset/(:tipeAsset)", (req, res) => {
  equipment.searchTipeAsset(req, res);
});

//API search equipment by nomorSeri 
app.get("/api/equipment/search/nomorseri/(:nomorSeri)", (req, res) => {
  equipment.searchNomorSeri(req, res);
});

//API add equipment
app.post("/api/equipment/add", uploadImage.single('image'), user.verifyToken, user.checkUserLevelAdmin, (req, res) => {
  equipment.add(req, res);
});

//API delete equipment
app.delete("/api/equipment/delete/(:no)", user.verifyToken, user.checkUserLevelAdmin, (req, res) => {
  equipment.delete(req, res);
});

//API update equipment
app.patch("/api/equipment/update/(:no)", uploadImage.single('image'), user.verifyToken, user.checkUserLevelAdmin, (req, res) => {
  equipment.update(req, res);
});

/**
 * API Tipe Asset
 */

app.get("/api/tipeasset/list", (req,res) => {
  tipeAsset.getList(req,res);
});

app.get("/api/tipeasset/search/(:tipeAsset)", (req,res) => {
  tipeAsset.search(req,res);
});

app.post("/api/tipeasset/add", upload.none(), user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  tipeAsset.add(req,res);
})

app.patch("/api/tipeasset/update/(:tipeAsset)", upload.none(), user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  tipeAsset.update(req,res);
})

app.delete("/api/tipeasset/delete/(:tipeAsset)", user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  tipeAsset.delete(req,res);
})

/** 
 * API User 
*/

//API registration user 
app.post("/api/user/registrasi", upload.none(), (req, res) => {
  user.regristration(req, res);
});

//API login user
app.post("/api/user/login", upload.none(), (req,res) => {
  user.login(req, res);
});

//API Refresh Token
app.get("/api/user/refreshtoken", upload.none(), (req,res) => {
  user.refreshToken(req,res);
})

//API Logout
app.get("/api/user/logout", upload.none(), (req,res) => {
  user.logout(req,res);
})

//API Search User by Username
app.get("/api/user/profile/:username", user.verifyToken, (req,res) => {
  user.searchUser(req,res);
})

//API Update Profile User
app.patch("/api/user/profile/update/:username", upload.none(), user.verifyToken, (req,res) => {
  user.update(req,res);
})

/**
 * API Kuotasi
 */
/**API Kuotasi 
 * API Kuotasi digunakan untuk client meminta kuotasi atas penyewaan barang yang telah dipilih oleh user kemudian dikirim ke email Perusahaan.
*/
app.post("/api/kuotasi/add", upload.none(), user.verifyToken, user.checkUserLevelUser, (req,res) => {
  kuotasi.add(req, res);
})

//API Search Kuotasi 
app.get("/api/kuotasi/search/(:nomorKuotasi)", user.verifyToken, (req,res) => {
  kuotasi.search(req, res);
})

//API List Kuotasi 
app.get("/api/kuotasi/list", user.verifyToken, (req, res) => {
  kuotasi.get(req, res);
});

/**API Kuotasi Update 
 * API Kuotasi Update digunakan ketika perusahaan telah menentukan harga sewa dari permintaan kuotasi dan penawaran harga kemudian dikirim ke email user yang bersangkutan
*/
app.patch("/api/kuotasi/update/(:nomorKuotasi)", upload.none(), user.verifyToken, user.checkUserLevelAdmin, (req, res) => {
  kuotasi.update(req, res);
});

/**
 * API Penyewaan
 */

//API Penyewaan List
app.get("/api/penyewaan/list", user.verifyToken, (req,res) => { 
  penyewaan.getList(req,res);
})

//API Penyewaan Get List By Username
app.get("/api/penyewaan/search/(:username)", user.verifyToken, (req,res) => {
  penyewaan.getListByUsername(req,res);
})

//API Penyewaan Detail 
app.get("/api/penyewaan/detail/(:nomorKuotasi)", user.verifyToken, (req,res) => {
  penyewaan.getDetailByNomorKuotasi(req,res);
})

//API Penyewaan Detail by Order Id
app.get("/api/penyewaan/detail/order_id/(:order_id)", user.verifyToken, (req,res) => {
  penyewaan.getDetailByOrderId(req,res);
})


//API Penyewaan Update Status
/**
 * API ini digunakan untuk merubah status penyewaan menjadi ke tahap pembayaran dengan menggunakan order_id
 */
app.patch("/api/penyewaan/update/status/by/order_id/(:order_id)", upload.none(), user.verifyToken, user.checkUserLevelUser, (req,res) => {
  penyewaan.updateStatusByOrderID(req,res);
})

//API Penyewaan Update Status
/**
 * API ini digunakan untuk merubah status penyewaan menjadi ke tahap aktif sewa dengan menggunakan order_id
 */
app.patch("/api/penyewaan/update/status/aktif/by/order_id/(:order_id)", upload.none(), user.verifyToken, user.checkUserLevelUser, (req,res) => {
  penyewaan.updateStatusByOrderIDAktif(req,res);
})

//API Update Generate New ORDER ID 
app.patch("/api/penyewaan/generate/order_id/(:order_id)", upload.none(), user.verifyToken, user.checkUserLevelUser, (req,res) => {
  penyewaan.updateGenerateOrderID(req,res);
})

// //API Delete Penyewaan
// app.delete("/api/penyewaan/delete/(:nomorKuotasi)", user.verifyToken, user.checkUserLevelUser, (req,res) => {
//   penyewaan.delete(req,res);
// })

//API Upload File Invoice
app.patch("/api/penyewaan/upload/invoice/(:order_id)", uploadFile.single('file'), user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  penyewaan.uploadFileInvoice(req,res);
})

//API Upload File Surat Kontrak Sewa
app.patch("/api/penyewaan/upload/kontrakkerja/(:order_id)", uploadFile.single('file'), user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  penyewaan.uploadFileKontrakSewa(req,res);
})

//API Upload File Pengirimang Barang
app.patch("/api/penyewaan/upload/pengiriman/(:order_id)", uploadFile.single('file'), user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  penyewaan.uploadFilePengirimanBarang(req,res);
})

//API Upload File Surat Serah Terima Barang
app.patch("/api/penyewaan/upload/serahterima/(:order_id)", uploadFile.single('file'), user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  penyewaan.uploadFileSerahTerima(req,res)
})

//API Konfirmasi Pengembalian Barang
app.patch("/api/penyewaan/confirm/status/pengembalian/(:order_id)", user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  penyewaan.confirm(req,res);
})

/**
 * API Pemeliharaan
 */

//API List Pemeliharaan
app.get("/api/maintenance/list", user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  pemeliharaan.get(req, res);
})

//API Add Pemeliharaan
app.post("/api/maintenance/add", upload.none(), user.verifyToken, user.checkUserLevelAdmin, (req, res) => {
  pemeliharaan.add(req, res);
});

//API Delete Pemeliharaan
app.delete("/api/maintenance/delete/(:no)", user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  pemeliharaan.delete(req, res);
})

//API Update Pemeliharaan
app.patch("/api/maintenance/update/(:no)", uploadFileForm.single('file'), user.verifyToken, user.checkUserLevelAdmin, (req, res) => {
  pemeliharaan.update(req, res);
});

//API Detail Pemeliharaan
app.get("/api/maintenance/detail/(:no)", user.verifyToken, user.checkUserLevelAdmin, (req, res) => {
  pemeliharaan.detail(req, res);
})

//API Confirmation Status
app.patch("/api/maintenance/confirmation/status/(:no)/(:nomorSeri)", upload.none(), user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  pemeliharaan.confirmation(req, res);
})

/**
 * API Kerusakan
 */

//API Kerusakan List By No Maintenance
app.get("/api/maintenance/kerusakan/(:no)", user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  kerusakan.get(req,res);
})

//API Kerusakan Add
app.post("/api/maintenance/kerusakan/add/(:no)", upload.none(), user.verifyToken, user.checkUserLevelAdmin, (req, res) => {
  kerusakan.add(req,res);
});

//API Kerusakan Update
app.patch("/api/maintenance/kerusakan/update/(:id)", upload.none(), user.verifyToken, user.checkUserLevelAdmin, (req, res) => {
  kerusakan.update(req,res);
});

//API Kerusakan Search
app.get("/api/maintenance/kerusakan/search/(:id)", user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  kerusakan.search(req,res);
})

//API Kerusakan Delete
app.delete("/api/maintenance/kerusakan/delete/(:id)", user.verifyToken, user.checkUserLevelAdmin, (req,res) => {
  kerusakan.delete(req,res);
})

/**
 * API Pembayaran
 */
//API Get Pembayaran By Order_id 
app.get("/api/pembayaran/search/(:order_id)", user.verifyToken, (req,res) => {
  pembayaran.getPembayaranByOrderID(req,res);
})


//API Get Pembayaran List
app.get("/api/pembayaran/list", user.verifyToken, (req,res) => {
  pembayaran.getList(req,res);
})

//API Create Order
app.post("/api/pembayaran/detail/(:order_id)", upload.none(), user.verifyToken, user.checkUserLevelUser, (req,res) => {
  pembayaran.createOrder(req,res);
})

//API Insert Pembayaran On Success
app.post("/api/pembayaran/insert/(:order_id)", upload.none(), user.verifyToken, user.checkUserLevelUser, (req,res) => {
  pembayaran.insertOnSuccess(req,res)
})

//API Change Status Pembayaran 
app.patch("/api/pembayaran/update/status/(:order_id)", upload.none(), user.verifyToken, user.checkUserLevelUser, (req,res) => {
  pembayaran.updateStatusPembayaran(req,res);
})

//API Get Status Pembayaran by Order Id From Midtrans
app.get("/api/pembayaran/status/(:order_id)", user.verifyToken, user.checkUserLevelUser,  async (req,res) => {
  pembayaran.getStatusPembayaranMidtrans(req,res);
})


//Notice Server
app.listen(port, () => {
  console.log(`API Listening on port ${port}`);
});
