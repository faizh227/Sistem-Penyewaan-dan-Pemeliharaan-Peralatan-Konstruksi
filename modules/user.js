const response = require("../response");
const auth = require('basic-auth');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const JOI = require('joi');

const schema = JOI.object({
    email: JOI.string()
        .email()
        .max(50),
    username: JOI.string()
            .max(50),
    password: JOI.string(),
})

const schemaLogin = JOI.object({
    username: JOI.string()
            .max(50),
    password: JOI.string(),
})

const schemaProfil = JOI.object({
    nama: JOI.string().max(255),
    telepon: JOI.string().max(13),
    alamat: JOI.string().max(255),
    perusahaan: JOI.string().max(255),
    jabatan: JOI.string().max(255),
})

class User {
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

    regristration(req, res) {
        const { username, email, password} = req.body;
        const verifyauth = this.basicauth(req);
        const { error } = schema.validate({username:username, email:email, password:password});

        if(verifyauth === true)
        {
            if (username && email && password) {
                if (!error) {
                    const hashedPassword = bcrypt.hashSync(password, 10); 
                    
                    const sql = `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`
                    
                    this.db.query(sql, [username, email, hashedPassword], (error, result) => {
                        if (!error) 
                            return response(200, req.body, "create data user", res);
                        else 
                        {
                            if(error.code === "ER_DUP_ENTRY")
                            {
                                return response(409, req.body, "username or email already registered", res);
                            }
                        }
                    });
                } else {
                    return response(400, error, "Format tidak sesuai", res);
                }
            } else {
                return response (400, "", "Input kosong", res);
            }
        }
        else
        {
            return response(401, "", "Unauthorized", res);
        }
    }

    login(req, res) {
        const { username, password} = req.body;

        const sql = `SELECT * FROM user WHERE username = ?`;
        const sql2 = `UPDATE user SET token = ? WHERE username = ?`;
        const {error} = schemaLogin.validate({username:username, password:password});
        const verifyauth = this.basicauth(req);
        if(verifyauth === true)
        {
            if (!username || !password) {
                return response(400, "", "Input kosong", res);
            } else {
                if(!error) {
                    try {
                        this.db.query(sql, [username] , (error, result) => {
                            if(result.length !== 0)
                            {
                                const databaseUsername = result[0].username;
                                const hashedPassword = result[0].password;
                                if (bcrypt.compareSync(password, hashedPassword) === true && databaseUsername === username) { 
                                    const arrayResult = {
                                        username: result[0].username,
                                        level: result[0].level,
                                    }
                                    const accessToken = jwt.sign(arrayResult, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1h', algorithm: 'HS256' });
                                    const refreshToken = jwt.sign(arrayResult, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: '1d', algorithm: 'HS256'})
                                    const payload = {
                                        "user": arrayResult,
                                        "token": {
                                            "accessToken" : accessToken,
                                        },
                                    };
                                    try {
                                        this.db.query(sql2, [refreshToken, username], (error, result) => {
                                            res.cookie('refreshToken', refreshToken, {
                                                httpOnly: true,
                                                maxAge: 24 * 60 * 60 * 1000,
                                            })
                                            return response(200, payload, "login success", res);
                                        })
                                    } catch (error) {
                                        console.log(error);
                                    }
                                } else {
                                    return response(400, req.body,"Password tidak sesuai", res);
                                }
                            }
                            else {
                                return response(404, "", "Akun tidak terdaftar", res);
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    return response(400, error, "Format tidak sesuai", res);
                }
            }
        }
        else
        {
            return response(401, "", "Unauthorized", res);
        }
    }

    verifyToken (req,res,next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token === null)
        {
            return response(401, "", "Unathorized", res);
        }
        else
        {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
                if(err)
                {
                    return response(403, "", "Forbidden Access", res);
                }
                else
                {
                    req.username = decoded.username;
                    req.level = decoded.level;
                    next();
                }
            })
        }
    }

    refreshToken(req,res) {
        const cookies = req.cookies;
        const sql = 'SELECT * FROM user WHERE token = ?';
        if(!cookies?.refreshToken)
        {
            return response(401, "", "Unauthorized", res);
        }
        else
        {
            try {
                this.db.query(sql, [cookies.refreshToken], (error,result) => {
                    if(result.length !== 0) {
                        jwt.verify(
                            cookies.refreshToken,
                            process.env.REFRESH_TOKEN_SECRET_KEY,
                            (err,decoded) => {
                                if(err || decoded.username !== result[0].username)
                                {
                                    return response(403, "", "Forbidden Access", res);
                                }
                                else
                                {
                                    const arrayResult = {
                                        username: result[0].username,
                                        level: result[0].level,
                                    }
                                    const accessToken = jwt.sign(arrayResult, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1h', algorithm: 'HS256' });
                                    const payload = {
                                        "user": arrayResult,
                                        "token": {
                                            "accessToken" : accessToken,
                                        },
                                    };
                                    return response(200, payload, "refresh token success", res);
                                }
                            }
                        )
                    }   
                    else {
                        return response(404, "", "Refresh token isn't valid", res);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    logout(req,res) {
        const cookies = req.cookies;
        const sql = `UPDATE user SET token = "" WHERE token = ?`;
        if(!cookies.refreshToken || cookies.refreshToken === "" || cookies.refreshToken === undefined)
        {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            })
            return response(404, "", "There's no refresh token", res);
        }
        else
        {
            try {
                this.db.query(sql, [cookies.refreshToken], (error,result) => {
                    if(result.affectedRows !== 0)
                    {
                        res.clearCookie('refreshToken', {
                                httpOnly: true,
                                maxAge: 24 * 60 * 60 * 1000,
                        })
                        return response(200, result, "Logout success", res);
                    }
                    else
                    {
                        if(error) {
                            return response(500, error, "Internal server error", res);
                        }
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    searchUser(req,res) {
        const username = req.params.username;
        const sql = `SELECT * FROM user WHERE username = ?`;
        try {
            this.db.query(sql, [username], (error,result) => {
                if (!error) {
                    if (result.length !== 0) {
                        return response(200, result, "get data user success",res);
                    }
                    else {
                        return response(404, "", "data user isn't exist", res);
                    }
                }
                else {
                    return response(500, error, "Internal Server Error", res);
                }
            })
        } catch (error) {
            return response(500, error, "Internal Server Error", res);
        }
    }

    update(req, res) {
        const username = req.params.username;
        const {nama, telepon, alamat, perusahaan, jabatan} = req.body;
        const sql = `UPDATE user SET nama = ?, noTelepon = ?, alamat = ?, perusahaan = ?, jabatan = ? WHERE username = ?`;
        const {error} = schemaProfil.validate({nama:nama, telepon:telepon, alamat:alamat, perusahaan:perusahaan, jabatan:jabatan});
        if (!nama || !telepon || !alamat || !perusahaan || !jabatan) {
            return response(400, "", "Input kosong", res);
        } else {
            if(!error) {
                try {
                    this.db.query(sql, [nama, telepon, alamat, perusahaan, jabatan, username], (error,result) => {
                        if (error) {
                            return response(500, error, "Internal Server Error", res);
                        }
                        else {
                            if (result.affectedRows === 0) {
                                return response(409, "", "failed to update profile, user doesn't exist", res);
                            }
                            else {
                                return response(200, result, "update profile user success", res);
                            }
                        }
                    })
                } catch (error) {
                    return response(500, error, "Internal Server Error", res);
                }
            } 
            else 
            {
                response(400, error, "Format tidak sesuai", res);    
            }
        }
    }

    checkUserLevelAdmin(req,res,next) {
        const userLevel = req.level;
        if(userLevel === 2)
        {
            next();
        } 
        else
        {
            response(403, "", "Forbidden Access: User level isn't an Admin", res);
        }
    }

    checkUserLevelUser(req,res,next) {
        const userLevel = req.level;
        if(userLevel === 1)
        {
            next();
        }
        else
        {
            response(403, "", "Forbidden Access: User level isn't a User", res);
        }
    }
}

module.exports = User;