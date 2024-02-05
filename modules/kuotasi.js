const response = require("../response");
const { format} = require('date-fns');
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const JOI = require('joi');

const schema = JOI.object({
    nama: JOI.string().max(50),
    merk: JOI.string().max(50),
    nomorSeri: JOI.string().max(25),
    jumlah: JOI.number().integer(3),
    username: JOI.string().max(50),
    namaLengkap: JOI.string().max(255),
    namaPerusahaan: JOI.string().max(255),
    email: JOI.string().email().max(50),
    noTelepon: JOI.string().max(13),
    tanggalAwalSewa: JOI.date().greater('now'),
    tanggalBerakhirSewa: JOI.date().greater(JOI.ref('tanggalAwalSewa')),
    namaProyek: JOI.string().max(100),
    alamatProyek: JOI.string(),
})

const schemaUpdateKuotasi = JOI.object({
    nama: JOI.string().max(50),
    merk: JOI.string().max(50),
    nomorSeri: JOI.string().max(25),
    jumlah: JOI.number().integer(3),
    username: JOI.string().max(50),
    namaLengkap: JOI.string().max(255),
    namaPerusahaan: JOI.string().max(255),
    email: JOI.string().email().max(50),
    noTelepon: JOI.string().max(13),
    tanggalAwalSewa: JOI.date().greater('now'),
    tanggalBerakhirSewa: JOI.date().greater('now'),
    namaProyek: JOI.string().max(100),
    alamatProyek: JOI.string(),
    hargaPerUnit: JOI.number().integer(11),
    hargaTotal: JOI.number().integer(11)
})

class Kuotasi {
    constructor(db) {
        this.db = db;
    }

    add(req, res) {
        const { nama, merk, nomorSeri, jumlah, username, namaLengkap, namaPerusahaan, email, noTelepon, tanggalAwalSewa, tanggalBerakhirSewa, namaProyek, alamatProyek } = req.body;  
        const {error} = schema.validate({nama:nama, merk:merk, nomorSeri:nomorSeri, jumlah:jumlah, username:username, namaLengkap:namaLengkap, namaPerusahaan:namaPerusahaan, email:email, 
        noTelepon:noTelepon, tanggalAwalSewa:tanggalAwalSewa, tanggalBerakhirSewa:tanggalBerakhirSewa, namaProyek:namaProyek, alamatProyek:alamatProyek});

        if (!nama || !merk || !nomorSeri || !jumlah || !username || !namaLengkap || !namaPerusahaan || !email || !noTelepon || !tanggalAwalSewa || !tanggalBerakhirSewa || !namaProyek || !alamatProyek) {
            return response(400, "", "Input kosong", res);
        }
        else {
            if(!error) {
                const sql = `INSERT INTO kuotasi (nama, merk, nomorSeri, jumlah, username, namaLengkap, namaPerusahaan, email, noTelepon, tanggalAwalSewa, tanggalBerakhirSewa, namaProyek, alamatProyek) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
                this.db.query(sql, [nama, merk, nomorSeri, jumlah, username, namaLengkap, namaPerusahaan, email, noTelepon, tanggalAwalSewa, tanggalBerakhirSewa, namaProyek, alamatProyek], (error, result) => {
                    try {
                        return response(200, result, "insert data to kuotasi success", res);
                    } catch (error) {
                        console.log(error)
                    }
                })
            } else {
                return response(400, error, "Format tidak sesuai", res);
            }
        }
    }

    search(req, res) {
        const nomorKuotasi = req.params.nomorKuotasi;

        const sql = `SELECT * FROM kuotasi WHERE nomorKuotasi = ?`;

        this.db.query(sql, [nomorKuotasi], (error, result) => {
            try {
                if(result.length !== 0) {
                    return response(200, result, "search data kuotasi success", res);
                } 
                else 
                {
                    return response(404, "", "data kuotasi not found", res);
                }
            } catch (error) {
                console.log(error);
            }
        })
    }

    get(req, res) {
        const sql = `SELECT * FROM kuotasi`;

        this.db.query(sql, (error, result) => {
            try {
                response(200, result, "get list kuotasi", res);
            } catch (error) {
                console.log(error);
            }
        });
    }

    update(req, res) {
        const nomorKuotasi = req.params.nomorKuotasi;
        const { hargaPerUnit, hargaTotal, nomorSeri, username, tanggalAwalSewa, tanggalBerakhirSewa, namaProyek, alamatProyek, jumlah, email, nama, merk, namaLengkap, namaPerusahaan } = req.body;
            req.body;

        const {error} = schemaUpdateKuotasi.validate({nama:nama, merk:merk, nomorSeri:nomorSeri, jumlah:jumlah, username:username, namaLengkap:namaLengkap, namaPerusahaan:namaPerusahaan, email:email, tanggalAwalSewa:tanggalAwalSewa, tanggalBerakhirSewa:tanggalBerakhirSewa, namaProyek:namaProyek, alamatProyek:alamatProyek, hargaPerUnit:hargaPerUnit, hargaTotal:hargaTotal});

        if(!hargaPerUnit || !hargaTotal || !nomorSeri || !username || !tanggalAwalSewa || !tanggalBerakhirSewa || !namaProyek || !alamatProyek || !jumlah || !email || !nama || !merk || !namaLengkap || !namaPerusahaan) {
            return response(400, "", "Input kosong", res);
        }
        else {
            if(!error) {
                const order_id = uuidv4();
        
                const tanggalAwalSewaformatted = format(new Date(tanggalAwalSewa), 'dd-MMM-yy');
                const tanggalBerakhirSewaformatted = format(new Date(tanggalBerakhirSewa), 'dd-MMM-yy');
        
                const transporter = nodemailer.createTransport({
                    service: 'Outlook',
                    auth: {
                    user: 'appskripsipenyewaan@outlook.com',
                    pass: '/V546wE4q(',
                    }
                });
        
                const mailOptions = {
                    from: 'appskripsipenyewaan@outlook.com',
                    to: `${email}`,
                    subject: `Penawaran Harga Sewa ${nama} Nomor Seri ${nomorSeri}`,
                    text: `Detail Product\nNama: ${nama}\nMerk: ${merk}\nNomor Seri: ${nomorSeri}\nJumlah: ${jumlah}\n\nDetail Contact\nNama Lengkap: ${namaLengkap}\nPerusahaan: ${namaPerusahaan}\n\nDetail Sewa\nNama Proyek: ${namaProyek}\nAlamat Proyek: ${alamatProyek}\nTanggal Awal Sewa: ${tanggalAwalSewaformatted}\nTanggal Berakhir Sewa: ${tanggalBerakhirSewaformatted}\nHarga Per Unit/Bulan: Rp.${hargaPerUnit}/Bulan\nHarga Total: Rp.${hargaTotal}\n\nUntuk dapat melanjutkan proses penyewaan, silahkan untuk mengunjungi website PSI.
                    ` 
                }
        
                const sql = `UPDATE kuotasi SET hargaPerUnit = ?, hargaTotal = ?, status = "Disetujui" WHERE nomorKuotasi = ?;
                    INSERT INTO penyewaan (order_id, nomorKuotasi, nomorSeri, username, tanggalAwalSewa, tanggalBerakhirSewa, alamatProyek, hargaPerUnit, hargaTotal, jumlah) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);UPDATE equipment SET status = "Tersewa" WHERE nomorSeri = ?
                `;
                this.db.query(sql, [hargaPerUnit, hargaTotal, nomorKuotasi, order_id, nomorKuotasi, nomorSeri, username, new Date(tanggalAwalSewa), new Date(tanggalBerakhirSewa), alamatProyek, hargaPerUnit, hargaTotal, jumlah, nomorSeri] ,(error, result) => {
                    if (error) {
                        if(error.code === "ER_NO_REFERENCED_ROW_2") {
                            return response(409, "", "failed to update data kuotasi, resources doesn't exist", res);
                        }
                        else {
                            return response (500, error, "Internal server error", res);
                        }
                    } 
                    else {
                        transporter.sendMail(mailOptions, (error, info) => {
                        if (error)
                            throw error;
                        })
                        return response(200, result, "update data kuotasi success", res);
                    }
                });
            } else {
                return response(400, error, "Format tidak sesuai", res);
            }
        }
    }
}

module.exports = Kuotasi;