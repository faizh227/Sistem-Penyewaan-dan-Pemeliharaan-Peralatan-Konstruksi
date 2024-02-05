import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './register.css';
import { handleErrMsg } from "../function/handleErrMsg";

function Registrasi() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [username, email, password])

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3001/api/user/registrasi", {
            username,
            email,
            password,
        }, {
            auth: {
                username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            }
        })
        .then((res) => {
            Navigate("/login");
        })
        .catch((err) => {
            switch (err.response.status) {
                case 400:
                    switch (err.response.data.message) {
                        case "Input kosong":
                            setErrMsg('Username, email atau password tidak boleh dikosongkan');
                            break;
                        case "Format tidak sesuai":
                            setErrMsg('Username, email atau password yang dimasukkan tidak sesuai dengan format ketentuan');    
                            break;
                        default:
                            break;
                    }
                    break;
                case 409:
                    setErrMsg('Username atau email sudah terdaftar');
                    break;
                default:
                    break;
            }
        });
    }
    return (
        <div className="container-fluid g0 d-flex justify-content-center text-center register">
            <div className="row">
                <div className="col">
                    <div className="overlay background img"></div>
                    <div className="card p-3 card-regristrasi">
                        <h1 className="h1-register">Register</h1>
                        {handleErrMsg(errMsg)}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="nama" className="form-label form-label-register-username">Username : </label>
                            <input className="form-control form-control-register-username" type="text" id="username" onChange={(event) => setUsername(event.target.value)}></input>
                            <label htmlFor="nama" className="form-label form-label-register-email">Email : </label>
                            <input className="form-control form-control-register-email" type="email" id="email" onChange={(event) => setEmail(event.target.value)}></input>
                            <label htmlFor="nama" className="form-label form-label-register-password">Password : </label>
                            <input className="form-control form-control-register-password" type="password" id="password" onChange={(event) => setPassword(event.target.value)}></input>
                            <div className="row">
                                <div className="col col-navigation-register">
                                    <Link className="navigation-link-to-login" to="/login">Sudah ada akun? Tekan link ini untuk login!</Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-navigation-register">
                                    <button className="btn btn-register">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registrasi;