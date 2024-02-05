const response = require("../response");
const midtransClient = require('midtrans-client');
const axios = require('axios');
const JOI = require('joi');

const schema = JOI.object({
    hargaTotal: JOI.number().integer(11),
    namaLengkap: JOI.string().max(255),
    email: JOI.string().email().max(50),
    noTelepon: JOI.string().max(13),
    nomorSeri: JOI.string().max(25),
    jumlah: JOI.number().integer(3),
    nama: JOI.string().max(50),
    merk: JOI.string().max(50),
    alamatProyek: JOI.string(),
})

const schemaInsert = JOI.object({
    hargaTotal: JOI.number().integer(11),
    namaLengkap: JOI.string().max(255),
    noTelepon: JOI.string().max(13),
    email: JOI.string().email().max(50),
    alamatProyek: JOI.string(),
    token: JOI.string().max(36)
})

class Pembayaran {
    constructor(db) {
        this.db = db;
    }

    getPembayaranByOrderID(req,res) {
        const order_id = req.params.order_id;

        const sql = `SELECT * FROM pembayaran WHERE order_id = ?`

        this.db.query(sql, [order_id], (error, result) => {
            if (error)
            {
                throw (error)
            }    
            else
            {
                if(result.length === 0) {
                    return response(404, "", "data pembayaran: " + order_id + " not found", res);
                }
                else {
                    return response(200, result, "get pembayaran by order_id success", res);
                }
            }
        })
    }

    getList(req,res) {
        const sql = `SELECT * FROM pembayaran`;

        this.db.query(sql, (error, result) => {
            if (error)
                throw error;
            else  
                response(200, result, "search data pembayaran success", res);
        })
    }

    createOrder(req,res) {
        const order_id = req.params.order_id;

        const {hargaTotal, namaLengkap, email, noTelepon, nomorSeri, jumlah, nama, merk, alamatProyek} = req.body;
        const {error} = schema.validate({hargaTotal:hargaTotal, namaLengkap:namaLengkap, email:email, noTelepon:noTelepon, nomorSeri:nomorSeri, jumlah:jumlah, nama:nama, merk:merk, alamatProyek:alamatProyek});

        if(!hargaTotal || !namaLengkap || !noTelepon || !email || !alamatProyek || !nomorSeri || !jumlah || !nama || !merk) {
            return response(400, "", "Input kosong", res);
        }
        else {
            if(!error) {
                try {
                    const snap = new midtransClient.Snap({
                        // Set to true if you want Production Environment (accept real transaction).
                        isProduction : false,
                        serverKey : process.env.MIDTRANS_SERVER_KEY,
                        clientKey : process.env.MIDTRANS_CLIENT_KEY
                    });
        
                    const parameter = {
                        "transaction_details": {
                            "order_id": order_id,
                            "gross_amount": Math.floor(hargaTotal),
                        },
                        "credit_card": {
                            "secure" : false
                        },
                        "item_details": {
                            "id": nomorSeri,
                            "price": Math.floor(hargaTotal),
                            "quantity": jumlah,
                            "name": nama,
                            "brand": merk,
                        },
                        "customer_details": {
                            "first_name" : namaLengkap,
                            "email" : email,
                            "phone" : noTelepon,
                        },
                        "shipping_address": {
                            "first_name" : namaLengkap,
                            "email" : email,
                            "phone" : noTelepon,
                            "address" : alamatProyek,
                        }
                    };
        
                    snap.createTransaction(parameter).then((transaction) => {
                    response(200, transaction, "transaction token success", res);
                    })   
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                return response(400, error, "Format tidak sesuai", res);
            }
        }
    }

    insertOnSuccess(req,res) {
        const order_id = req.params.order_id;

        const {hargaTotal, namaLengkap, noTelepon, email, alamatProyek, token} = req.body;
        const { error } = schemaInsert.validate({hargaTotal: hargaTotal, namaLengkap:namaLengkap, noTelepon:noTelepon, email:email, alamatProyek:alamatProyek, token:token});

        if(!hargaTotal || !namaLengkap || !noTelepon || !email || !alamatProyek || !token) {
            return response(400, "", "Input kosong", res);
        }
        else {
            if(!error) {
                const sql = `INSERT INTO pembayaran (order_id, hargaTotal, namaLengkap, noTelepon, email, alamatProyek, snapToken) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        
                this.db.query (sql, [order_id, hargaTotal, namaLengkap, noTelepon, email, alamatProyek, token], (error, result) => {
                    if(error)
                        throw error;
                    else
                        response(200, result, "insert into pembayaran success", res);
                })
            } 
            else {
                return response(400, error, "Format tidak sesuai", res);
            }
        }
    }

    updateStatusPembayaran(req,res) {
        const order_id = req.params.order_id;

        const {transaction_status} = req.body;

        if(!transaction_status) {
            return response(400, "", "Input kosong", res);
        } else {
            const sql = `UPDATE pembayaran SET status = ? WHERE order_id = ?`;
    
            this.db.query(sql, [transaction_status, order_id], (error,result) => {
                if (error)
                    throw error;
                else
                    if(result.affectedRows === 0) {
                        return response(409, "", "failed to change status pembayaran, resources not exist", res);
                    }
                    else {
                        return response(200, result, "change status pembayaran success", res);
                    }
            })
        }
    }

    async getStatusPembayaranMidtrans(req,res) {
        const order_id = req.params.order_id;

        try {
            const data = await axios.get("https://api.sandbox.midtrans.com/v2/"+ order_id +"/status", {
            headers: {
                'Accept' : "application/json",
                'Content-Type': "application/json",
            },
            auth: {
                username: "SB-Mid-server-MPYJQk2euT6EuMeS1qzSfbGa",
                password: "",
            }
            })
            if(data.data.status_code === "404") {
                return response(404, data.data, "Status transaction not found", res);
            }
            else if (data.data.status_code === "200") {
                return response(200, data.data, "get status api transaction from midtrans success", res);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Pembayaran;