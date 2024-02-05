const response = require("../response");
const JOI = require('joi');

const schema = JOI.object({
    tanggal: JOI.date().greater('now'),
    pemohon: JOI.string(),
    bagian: JOI.string(),
    item: JOI.string()
            .max(50),
    nomorSeri: JOI.string()
            .max(25),
    lainLain: JOI.string(),
})

class Pemeliharaan {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        const sql = `SELECT * FROM maintenance`;

        this.db.query(sql, (error,result) => {
            if (error)
                throw (error)
            else
                response(200, result, "get list maintenance", res);
        })
    }

    add(req, res) {
        const { tanggal, pemohon, bagian, item, nomorSeri, lainLain } =
            req.body;
        const { error } = schema.validate({tanggal:tanggal, pemohon:pemohon, bagian:bagian, item:item, nomorSeri:nomorSeri, lainLain:lainLain});

        if(!tanggal || !pemohon || !bagian || !item || !nomorSeri || !lainLain) {
            response(400, "", "Input kosong", res);
        } else {
            if(error) {
                return response(400, error, "Format tidak sesuai", res);
            }
            else {
                const sql = `INSERT INTO maintenance (tanggal, pemohon, bagian, item, nomorSeri, lainLain) VALUES (?, ?, ?, ?, ?, ?); UPDATE equipment SET status = "Maintenance" WHERE nomorSeri = ?`;
        
                this.db.query(sql, [tanggal, pemohon, bagian, item, nomorSeri, lainLain, nomorSeri], (error, result) => {
                    if (error) 
                        throw error;
                    else 
                        response(200, result, "post data maintenance", res);
                });
            }
        }
    }

    delete(req, res) {
        const no = req.params.no;

        const sql = `DELETE FROM kerusakan WHERE no = ?;DELETE FROM maintenance WHERE no = ?`;

        this.db.query(sql, [no, no], (error, result) => {
            if (error)
                throw error;
            else 
                if(result[0].affectedRows === 0 && result[1].affectedRows === 0) {
                    response(409, "", "failed to delete data maintenance, resources doesn't exist",res);
                }
                else {
                    response(200, result, "delete data maintenance", res);
                }
        })
    }

    update(req, res) {
        const no = req.params.no;

        const { tanggal, pemohon, bagian, item, nomorSeri, lainLain } = req.body;
        const { error } = schema.validate({tanggal:tanggal, pemohon:pemohon, bagian:bagian, item:item, nomorSeri:nomorSeri, lainLain:lainLain});
        
        if(!tanggal || !pemohon || !bagian || !item || !nomorSeri || !lainLain) {
            response(400, "", "Input kosong", res);
        } else {
            if(!req.file) {
                if(error) {
                    return response(400, error, "Format tidak sesuai", res);
                }
                else {
                    const sql = `UPDATE maintenance SET tanggal = ?, pemohon = ?, bagian = ?, item = ?, nomorSeri = ?, lainLain = ? WHERE no = ?`;
             
                    this.db.query(sql, [tanggal, pemohon, bagian, item, nomorSeri, lainLain, no] ,(error, result) => {
                        if (error) 
                            return response(500, error, "Internal server error",res);
                        else
                            if(result.affectedRows === 0) {
                                return response (409, "", "failed to update data maintenance, resources doesn't exist",res);
                            } else {
                                return response(200, result, "update data maintenance success", res);
                            }
                    });
                }
            }
            else {
                if(error) {
                    return response(400, error, "Format tidak sesuai", res);
                }
                else {
                    const { path: filePath} = req.file;
                    const formURL = `http://localhost:3001/${filePath}`;
                    
                    const sql = `UPDATE maintenance SET tanggal = ?, pemohon = ?, bagian = ?, item = ?, nomorSeri = ?, lainLain = ?, file = ? WHERE no = ?`;
    
                    this.db.query(sql, [tanggal, pemohon, bagian, item, nomorSeri, lainLain, formURL, no] ,(error, result) => {
                        if (error) 
                            return response(500, error, "Internal server error",res);
                        else
                           if(result.affectedRows === 0) {
                                return response (409, "", "failed to update data maintenance, resources doesn't exist",res);
                            } else {
                                return response(200, result, "update data maintenance success", res);
                            }
                    });
                }
            }
        }
    }

    detail(req, res) {
        const no = req.params.no;

        const sql = `SELECT * FROM maintenance WHERE no = ?`;

        this.db.query(sql, [no], (error, result) => {
            if (error)
                throw error;
            else 
                if(result.length === 0) {
                    return response (404, "", "Data maintenance not found", res);
                } 
                else {
                    response(200, result, "get specific data maintenance success", res);
                }
        })
    }

    confirmation(req, res) {
        const no = req.params.no;
        const nomorSeri = req.params.nomorSeri;

        const sql = `UPDATE maintenance SET status = "Pemeliharaan Telah Selesai" WHERE no = ?;UPDATE equipment SET status = "Tersedia" WHERE nomorSeri = ?`;

        this.db.query(sql, [no, nomorSeri] , (error,result) => {
            if (error)
                throw error;
            else
                if(result[0].affectedRows === 0 && result[1].affectedRows === 1) {
                    return response(409, "", "failed to confirmation maintenance, resources doesn't exit",res);
                } 
                else {
                    return response(200, result, "confirmation data maintenance success", res);
                }
        })
    }
}

module.exports = Pemeliharaan;