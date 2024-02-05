const response = require("../response");
const { v4: uuidv4 } = require('uuid');

class Penyewaan {
    constructor(db) {
        this.db = db;
    }

    getList(req,res) {
        const sql = `SELECT * FROM penyewaan`;

        this.db.query(sql, (error, result) => {
            if (error) 
                throw error;
            else
                response(200, result, "get data penyewaan success", res);
        })
    }

    getListByUsername(req,res) {
        const username = req.params.username;

        const sql = `SELECT * FROM penyewaan WHERE username = ?`;

        this.db.query(sql, [username] ,(error,result) => {
            if(error)
                throw error;
            else
                if(result.length === 0) {
                    return response(404, "", "Data penyewaan by username: " + username + " not found", res);
                } else {
                    return response(200, result, "get data penyewaan by username success", res);
                }
        })
    }

    getDetailByNomorKuotasi(req, res) {
        const nomorKuotasi = req.params.nomorKuotasi;

        const sql = `SELECT * FROM penyewaan WHERE nomorKuotasi = ?`;

        this.db.query(sql, [nomorKuotasi], (error,result) => {
            if(error)
                throw error;
            else
                if(result.length === 0) {
                    return response(404, "", "Data penyewaan by nomor kuotasi: " + nomorKuotasi + " not found", res);
                } else { 
                    return response(200, result, "get penyewaan detail by nomor kuotasi success", res);
                }
        })
    }

    getDetailByOrderId(req,res) {
        const order_id = req.params.order_id;

        const sql = `SELECT * FROM penyewaan WHERE order_id = ?`;

        this.db.query(sql, [order_id], (error,result) => {
            if (error) 
                throw error;
            else
                if(result.length === 0) {
                    return response(404, "", "Data penyewaan by order id:  " + order_id + " not found", res);
                } else {
                    return response(200, result, "get penyewaan detail by order id success", res);
                }
        })
    }

    updateStatusByOrderIDAktif(req,res) {
        const order_id = req.params.order_id;

        const sql = `UPDATE penyewaan SET status = "Aktif" WHERE order_id = ?;`;

        this.db.query(sql, [order_id] , (error,result) => {
            if(error) 
                throw error;
            else
                if(result.affectedRows === 0) {
                    return response(409, "", "failed to update status penyewaan, resources not exist", res);
                }
                else {
                    return response(200, result, "update status penyewaan", res);
                }
        })
    }

    updateStatusByOrderID(req,res) {
        const order_id = req.params.order_id;

        const sql = `UPDATE penyewaan SET status = "Pembayaran" WHERE order_id = ?;`;

        this.db.query(sql, [order_id] , (error,result) => {
            if(error) 
                throw error;
            else
                if(result.affectedRows === 0) {
                    return response(409, "", "failed to update status penyewaan, resources not exist", res);
                } else {
                    return response(200, result, "update status penyewaan", res);
                }
        })
    }

    updateGenerateOrderID(req, res) {
        const order_id = req.params.order_id;
        const new_order_id = uuidv4();

        const sql = `UPDATE penyewaan SET order_id = ? WHERE order_id = ?`;

        this.db.query(sql, [new_order_id, order_id], (error,result) => {
            if(error)
                throw error;
            else
                if(result.affectedRows === 0) {
                    return response(409, "", "failed to generate order_id, resources not exist", res);
                } else {
                    return response(200, result, "generate order_id success", res);
                }
        })
    }

    uploadFileInvoice(req, res) {
        const order_id = req.params.order_id;

        if (req.file) {
            const { path: filePath} = req.file;
            const invoiceURL = `http://localhost:3001/${filePath}`;
    
            const sql = `UPDATE penyewaan SET invoice = ? WHERE order_id = ?`;
    
            this.db.query(sql, [invoiceURL, order_id], (error, result) => {
                if (error)
                    throw error;
                else
                    return response(200, result, "upload invoice success", res);
            })
        } 
        else {
            return response(400, "", "File tidak ada", res);
        }   
    }

    uploadFileKontrakSewa(req, res) {
        const order_id = req.params.order_id;
        if (!req.file) {
            return response(400, "", "File tidak ada", res);
        }
        else {
            const { path: filePath} = req.file;
    
            const KontrakSewaURL = `http://localhost:3001/${filePath}`;
    
            const sql = `UPDATE penyewaan SET kontrakKerja = ? WHERE order_id = ?`;
    
            this.db.query(sql, [KontrakSewaURL, order_id], (error, result) => {
                if (error)
                    throw error;
                else
                    response(200, result, "upload file kontrak sewa success", res);
            })
        }
    }

    uploadFilePengirimanBarang(req, res) {
        const order_id = req.params.order_id;
        if(!req.file) {
            return response(400, "", "File tidak ada", res);
        } else {
            const { path: filePath} = req.file;
    
            const url = `http://localhost:3001/${filePath}`;
    
            const sql = `UPDATE penyewaan SET pengiriman = ?, status = "Pengiriman" WHERE order_id = ?`;
    
            this.db.query(sql, [url, order_id], (error, result) => {
                if (error)
                    throw error;
                else
                    response(200, result, "upload file surat pengiriman barang success", res);
            })
        } 
    }

    uploadFileSerahTerima(req, res) {
        const order_id = req.params.order_id;

        if(req.file) {
            const { path: filePath} = req.file;
    
            const url = `http://localhost:3001/${filePath}`;
    
            const sql = `UPDATE penyewaan SET serahterima = ? WHERE order_id = ?`;
    
            this.db.query(sql, [url, order_id], (error, result) => {
                if (error)
                    throw error;
                else
                    response(200, result, "upload file surat serah terima barang success", res);
            })
        } else {
            return response(400, "", "File tidak ada", res);
        }
    }

    confirm(req,res) {
        const order_id = req.params.order_id;

        const sql = `SELECT * FROM penyewaan WHERE order_id = ?; SELECT * FROM pembayaran WHERE order_id = ?`;

        this.db.query(sql, [order_id, order_id], (error,result) => {
            if (error) 
                throw error;
            else
                if(result.length === 0) {
                    return response(409, "", "Failed to update data penyewaan by order id:  " + order_id + ", resources not exist", res);
                } else {
                    if(result[0][0].status === "Pembayaran") {
                        if(result[0][0].kontrakKerja && result[0][0].pengiriman && result[0][0].serahterima && result[0][0].invoice && result[1][0].status === "settlement")
                        {
                            const nomorseri = result[0][0].nomorSeri;
                            const sql2 = `UPDATE penyewaan SET status = "Pengembalian" WHERE order_id = ?; UPDATE equipment SET status = "Tersedia" WHERE nomorSeri = ?`;
    
                            this.db.query(sql2, [order_id, nomorseri], (error,result) => {
                                if(error)
                                {
                                    throw error;
                                }
                                else {
                                    return response(200, result, "Konfirmasi pengembalian barang berhasil", res);
                                }
                            })
                        }
                    }
                    else {
                        return response(400, "", "Proses penyewaan sedang berlangsung", res);
                    }
                }
        })
    }
}

module.exports = Penyewaan;