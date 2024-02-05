const response = require("../response");
const JOI = require('joi');

const schema = JOI.object({
    kerusakan: JOI.string(),
    usulan: JOI.string(),
    biaya: JOI.number()
        .integer(11),
    keterangan: JOI.string(),
})

class Kerusakan {
    constructor(db) {
        this.db = db;
    }

    get(req, res) {
        const no = req.params.no;

        const sql = `SELECT * FROM kerusakan WHERE no = ?`;

        this.db.query(sql, [no], (error,result) => {
            if (error) 
                throw error;
            else
                if(result.length === 0) {
                    return response(409, "", "failed to get data kerusakan, resources doesn't exist", res);
                }
                else {
                    return response(200, result, "get data kerusakan", res)
                }
        })
    }

    add(req, res) {
        const no = req.params.no;

        const { kerusakan, usulan, biaya, keterangan } = req.body;
        const { error } = schema.validate({kerusakan:kerusakan, usulan:usulan, biaya:biaya, keterangan:keterangan});

        if(!kerusakan || !usulan || !biaya || !keterangan) {
            return response(400, "", "Input kosong", res);
        } else {
            if(error) {
                return response(400, error, "Format tidak sesuai", res);
            } 
            else {
                const sql = `INSERT INTO kerusakan (no, kerusakan, usulan, biaya, keterangan) VALUES (?, ?, ?, ?, ?)`;
        
                this.db.query(sql, [no, kerusakan, usulan, biaya, keterangan], (error, result) => {
                    if (error) 
                        switch (error.code) {
                            case 'ER_NO_REFERENCED_ROW_2':
                                return response(409, "", "failed to add kerusakan, resources doesn't exist", res);
                            default:
                                return response(500, "", "Internal server error", res);
                        }
                    else
                        return response(200, result, "post data kerusakan success", res);
                });
            }
        }

    }

    update(req, res) {
        const id = req.params.id;

        const { kerusakan, usulan, biaya, keterangan } = req.body;
        const { error } = schema.validate({kerusakan:kerusakan, usulan:usulan, biaya:biaya, keterangan:keterangan});

        if(!kerusakan || !usulan || !biaya || !keterangan) {
            return response(400, "", "Input kosong", res);
        }
        else {
            if(error) {
                return response(400, error, "Format tidak sesuai", res);
            } 
            else {
                const sql = `UPDATE kerusakan SET kerusakan = ?, usulan = ?, biaya = ?, keterangan = ? WHERE id = ?`;
        
                this.db.query(sql, [kerusakan, usulan, biaya, keterangan, id], (error, result) => {
                    if (error) 
                        throw error;
                    else 
                        if(result.affectedRows === 0) {
                            return response(409, "", "failed to update data kerusakan, resources doesn't exist", res);
                        }
                        else {
                            return response(200, result, "post data kerusakan success", res);
                        }
                });
            }
        }
    }

    search(req, res) {
        const id = req.params.id;

        const sql = `SELECT * FROM kerusakan WHERE id = ?`;

        this.db.query(sql, [id], (error,result) => {
            if (error) 
                throw error;
            else
                if(result.length === 0) {
                    return response (409, "", "failed to search data kerusakan, resources doesn't exist", res);
                } else {
                    return response(200, result, "get data kerusakan", res);
                }
        })
    }

    delete(req, res) {
        const id = req.params.id;

        const sql = `DELETE FROM kerusakan WHERE id = ?`;

        this.db.query(sql, [id], (error, result) => {
            if (error)
                throw error;
            else
                if (result.affectedRows === 0) {
                    return response(409, "", "failed to delete data kerusakan, resources doesn't exist", res);
                } else {
                    return response(200, result, "delete success",res);
                }
        })
    }

    
}

module.exports = Kerusakan;