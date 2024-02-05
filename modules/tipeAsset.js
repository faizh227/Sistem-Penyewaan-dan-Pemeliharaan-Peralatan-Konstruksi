const response = require("../response");
const auth = require('basic-auth');
const JOI = require('joi');

const schema = JOI.object({
    keterangan: JOI.string()
                .max(50)
})

class TipeAsset {
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

    getList(req,res) {
        const sql = `SELECT * FROM tipeasset`;
        const verifyauth = this.basicauth(req);

        if(verifyauth === true) {
            try {
                this.db.query(sql, (error, result) => {
                    if (error)
                        throw error;
                    else
                        response(200, result, "success get list tipe asset", res);
                })
            } catch (error) {
                console.log(error);
            }
        }
        else {
            response(401, "", "Unauthorized", res);
        }
    }

    search(req, res) {
        const tipeAsset = req.params.tipeAsset;
        const verifyauth = this.basicauth(req);

        const sql = `SELECT * FROM tipeasset WHERE tipeAsset = ?`;

        if(verifyauth === true) {
            try {
                this.db.query(sql, [tipeAsset], (error,result) => {
                    if(error) 
                        throw error;
                    else
                        if(result.length !== 0) {
                            response(200, result, "get keterangan tipeasset success", res);
                        }
                        else {
                            response(404, "", "tipe asset not found", res);
                        }
                })
            } catch (error) {
                console.log(error);
            }
        }
        else {
            response(401, "", "Unauthorized", res);
        }
    }

    add(req,res) {
        const { keterangan } = req.body;

        const {error} = schema.validate({keterangan: keterangan});
        if(!keterangan) {
            return response(400, "", "Input kosong", res);
        } 
        else {
            if(error) {
                return response(400, error, "Format tidak sesuai", res);
            } else {
                const sql = `INSERT INTO tipeasset (keterangan) VALUES (?)`;
                try {
                    this.db.query(sql, [keterangan], (error,result) => {
                        if (!error) {
                            response(200, result, "post data tipe asset success", res);
                        }
                        else {
                            if (error.code === "ER_DUP_ENTRY") {
                                response(409, req.body, "failed to add tipe asset, resources is already exist", res);
                            } else {
                                response(500, error, "Internal Server Error", res);
                            }
                        }
                    })
                } catch (error) {
                    console.log(error);
                    response(500, error, "Internal Server Error", res);
                }
            }
        }
    }

    update(req,res) {
        const tipeAsset = req.params.tipeAsset;
        const {keterangan} = req.body;
        const {error} = schema.validate({keterangan: keterangan});

        if (!keterangan)  {
            response(400, "", "Input kosong", res);
        } 
        const sql = `UPDATE tipeasset SET keterangan = ? WHERE tipeAsset = ?`;
        
        if(error) {
            return response(400, error, "Format tidak sesuai", res);
        }
        else {
            try {
                this.db.query(sql, [keterangan, tipeAsset], (error,result) => {
                    if (result.affectedRows !== 0 && !error) {
                        response(200, result, "update keterangan data tipe asset success", res);
                    }
                    else if(result.affectedRows === 0 && !error) {
                        response(409, "", "failed to update tipe asset, resources doesn't exist", res);
                    }
                    else {
                        response(500, error, "Internal Server Error", res);
                    }
                })
            } catch (error) {
                response(500, error, "Internal Server Error", res);
            }
        }
    }

    delete(req,res) {
        const tipeAsset = req.params.tipeAsset;
        const sql = `DELETE FROM tipeasset WHERE tipeAsset = ?`;

        if (tipeAsset === undefined) {
            response(409, "", "failed to delete tipe asset, resources doesn't exist", res);
        }
        else {
            try {
                this.db.query(sql, [tipeAsset], (error,result) => {
                    if (!error) {
                        if (result.affectedRows !== 0) {
                            response(200, result, "delete data tipe asset success", res);
                        }
                        else {
                            response(409, "", "failed to delete tipe asset, resources doesn't exist", res);
                        }
                    }
                    else {
                        response(500, error, "Internal Server Error", res);
                    }
                })
            } catch (error) {
                console.log(error);
                response(500, error, "Internal Server Error", res);
            }
        }
    }
}

module.exports = TipeAsset;