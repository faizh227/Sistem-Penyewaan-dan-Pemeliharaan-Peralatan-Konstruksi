const path = require("path");
const response = require("../response");
const auth = require('basic-auth');
const JOI = require('joi');

const schema = JOI.object({
    nama: JOI.string()
        .max(50),
    merk: JOI.string()
        .max(50),
    nomorSeri: JOI.string()
            .max(50),
    nomorAlat: JOI.string()
            .max(50),
    noStok: JOI.number()
            .integer(3),
    warna: JOI.string()
            .max(50),
    keterangan: JOI.string(),
    tipeAsset: JOI.number()
                .integer(2),
    jumlah: JOI.number()
            .integer(3),
    hargaSewa: JOI.number()
            .integer(11),
    lokasi: JOI.string()
            .max(100),
}) 

class Equipment {
    constructor(db) {
        this.db = db;
    }

    basicauth(req) {
        const basicauth = auth(req);
        if(basicauth.name === process.env.BASIC_AUTH_USERNAME && basicauth.pass === process.env.BASIC_AUTH_PASS)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    getList(req, res) {
        const sql = `SELECT * FROM equipment`;
        const verifyauth = this.basicauth(req);

        if(verifyauth === true)
        {
            this.db.query(sql, (error,result) => {
                if (error) 
                    response(404, error, "list equipment not found", res);      
                else 
                    response (200, result, "get list equipment", res);
            })
        }
        else
        {
            response(401, "", "Unauthorized", res);
        }
        
    }

    search(req, res) {
        const no = req.params.no;
        const sql = `SELECT * FROM equipment WHERE no = ?`;
        const verifyauth = this.basicauth(req);

        if(verifyauth === true)
        {
            this.db.query(sql, [no], (error, result) => {
                if (error) 
                    throw error;
                else
                    if(result.length !== 0)
                    {
                        response(200, result, "get data equipment by nomor success", res);
                    }
                    else
                    {
                        response(404, "", "data equipment not found", res);
                    }
            });
        }
        else
        {
            response(401, "", "Unauthorized", res);
        }
    }

    searchNomorSeri(req, res){
        const nomorSeri = req.params.nomorSeri;
        const sql = `SELECT * FROM equipment WHERE nomorSeri = ?`;
        const verifyauth = this.basicauth(req);

        if(verifyauth === true)
        {
            this.db.query(sql, [nomorSeri], (error, result) => {
                if (error) 
                    throw error;
                else
                    if(result.length !== 0)
                    {
                        response(200, result, "get data equipment by nomor seri success", res);
                    }
                    else
                    {
                        response(404, "", "data equipment not found", res);
                    }
            });
        }
        else
        {
            response(401, "", "Unauthorized", res);
        }
    }

    searchTipeAsset(req, res){
        const tipeAsset = req.params.tipeAsset;
        const sql = `SELECT * FROM equipment WHERE tipeAsset = ?`;
        const verifyauth = this.basicauth(req);

        if(verifyauth === true)
        {
            this.db.query(sql, [tipeAsset], (error, result) => {
                if (error) 
                    throw error;
                else
                    if(result.length !== 0)
                    {
                        response(200, result, "get data equipment by tipe asset success", res);
                    }
                    else
                    {
                        response(404, "", "data equipment not found", res);
                    }
            });
        }
        else
        {
            response(401, "", "Unauthorized", res);
        }
    }

    add(req, res) {
        const { nama, merk, nomorSeri, nomorAlat, noStok, warna, keterangan, tipeAsset, jumlah, hargaSewa, lokasi } =
            req.body;
        
        const {error} = schema.validate({nama: nama, merk:merk, nomorSeri:nomorSeri, nomorAlat:nomorAlat, noStok:noStok, warna:warna, keterangan:keterangan, tipeAsset:tipeAsset, jumlah:jumlah, hargaSewa:hargaSewa, lokasi:lokasi});   

        if(!nama || !merk || !nomorSeri || !nomorAlat || !noStok || !warna || !keterangan || !tipeAsset || !jumlah || !hargaSewa || !lokasi) {
            return response(400, "", "Input kosong", res)
        }

        if(!req.file || !req.file.path) {
            return response(400, "", "Gambar Tidak Terpilih", res)
        }

        if(error) {
            return response(400, error, "Format tidak sesuai", res);
        } else {
            const { path: filePath} = req.file;
            const imageUrl = `http://localhost:3001/${filePath}`.replace(/\\/g, "\\\\");
            const sql = `INSERT INTO equipment (nama, merk, nomorSeri, nomorAlat, noStok, warna, keterangan, tipeAsset, jumlah, image, hargaSewa, lokasi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            
            this.db.query(sql, [nama, merk, nomorSeri, nomorAlat, noStok, warna, keterangan, tipeAsset, jumlah, imageUrl, hargaSewa, lokasi], (error, result) => {
                if(!error)
                {
                    return response(200, result, "post data equipment", res);
                }
                else
                {
                    if (error.code === "ER_DUP_ENTRY") {
                        return response(409, req.body, "failed to add equipment already exist", res);
                    }
                }
            });
        }
    }

    delete(req, res) {
        const no = req.params.no;
        const sql = `DELETE FROM equipment WHERE no = ?`;
        this.db.query(sql, [no] ,(error, result) => {
            if (error) 
                throw error;
            else
                if(result.affectedRows !== 0)
                {
                    response(200, result, "delete data equipment", res);
                }
                else
                {
                    response(409, "", "failed to delete equipment, resources not exist", res);
                }   
        });
    }

    update(req, res) {
        const no = req.params.no;
        const { nama, merk, nomorSeri, nomorAlat, noStok, warna, keterangan, tipeAsset, jumlah, image, hargaSewa, lokasi } =
            req.body;
        const {error} = schema.validate({nama: nama, merk:merk, nomorSeri:nomorSeri, nomorAlat:nomorAlat, noStok:noStok, warna:warna, keterangan:keterangan, tipeAsset:tipeAsset, jumlah:jumlah, hargaSewa:hargaSewa, lokasi:lokasi});   

        if(!nama || !merk || !nomorSeri || !nomorAlat || !noStok || !warna || !keterangan || !tipeAsset || !jumlah || !hargaSewa || !lokasi) {
            return response(400, req.body, "Input Kosong", res);
        }

        if(error) {
            return response(400, error, "Format tidak sesuai", res);
        }
        else { 
            if(req.file)
            {
                const { path: filePath} = req.file;
                const imageUrl = `http://localhost:3001/${filePath}`.replace(/\\/g, "\\\\");
                const sql = `UPDATE equipment SET nama = ?, merk = ?, nomorSeri = ?, nomorAlat = ?, noStok = ?, warna = ?, keterangan = ?, tipeAsset = ?, jumlah = ?, image = ?, hargaSewa = ?, lokasi = ? WHERE no = ?`;
                this.db.query(sql, [nama, merk, nomorSeri, nomorAlat, noStok, warna, keterangan, tipeAsset, jumlah, imageUrl, hargaSewa, lokasi, no], (error, result) => {
                    if (error) 
                        throw error;
                    else 
                        if(result.affectedRows !== 0)
                        {
                            return response(200, req.body, "update data equipment success", res);
                        }
                        else
                        {
                            return response(409, "", "update data equipment failed, resources doesn't exist", res);
                        }
                });
            }
            else
            {
                const sql = `UPDATE equipment SET nama = ?, merk = ?, nomorSeri = ?, nomorAlat = ?, noStok = ?, warna = ?, keterangan = ?, tipeAsset = ?, jumlah = ?, hargaSewa = ?, lokasi = ? WHERE no = ?`;
                this.db.query(sql, [nama, merk, nomorSeri, nomorAlat, noStok, warna, keterangan, tipeAsset, jumlah, hargaSewa, lokasi, no], (error, result) => {
                if (error) 
                    throw error;
                else 
                    if(result.affectedRows !== 0)
                    {
                        return response(200, req.body, "update data equipment success", res);
                    }
                    else
                    {
                        return response(409, "", "update data equipment failed, resources doesn't exist", res);
                    }
                });
            }
        }
    }
}

module.exports = Equipment;