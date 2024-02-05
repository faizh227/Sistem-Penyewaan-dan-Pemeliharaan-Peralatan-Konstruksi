import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { handleErrMsg } from "../function/handleErrMsg";

function Login() {
    const { setAuth } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');

    const Navigate = useNavigate();

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3001/api/user/login", {
            username,
            password,
        },
        {
            withCredentials: true,
            auth: {
                username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            }
        }).then((res) => {
            const accessToken = res.data.data.token.accessToken;
            const userLevel = res.data.data.user.level;
            setAuth({username, password, userLevel, accessToken});
            if(userLevel === 1)
            {
                Navigate('/');
            }
            else
            {
                Navigate('/dashboard');
            }
        }).catch((err) => {
            switch (err.response.data.status) {
                case 404:
                    setErrMsg('Akun tidak terdaftar');
                    break;
                case 400:
                    switch (err.response.data.message) {
                        case "Input kosong":
                            setErrMsg('Username atau password tidak boleh kosong');
                            break;
                        case "Password tidak sesuai":
                            setErrMsg('Password tidak sesuai');
                            break;
                        case "Format tidak sesuai":
                            setErrMsg('Masukkan username atau password dengan format sesuai ketentuan');
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        }
        );
    }

    return (
            <div className="container-fluid g-0 d-flex justify-content-center login">
                <div className="row">
                    <div className="col">
                        <div className="overlay background img"></div>
                        <div className="card p-3 card-login">
                            <h1 className="h1-login">Login</h1>
                            {handleErrMsg(errMsg)}
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="username" className="form-label form-label-login username">Username</label>
                                <input
                                    className="form-control form-control-login username"
                                    type="text"
                                    id="username"
                                    onChange={(event) => setUsername(event.target.value)}
                                ></input>
                                <label htmlFor="password" className="form-label form-label-login password">Password</label>
                                <input
                                    className="form-control form-control-login password"
                                    type="password"
                                    id="Merk"
                                    onChange={(event) => setPassword(event.target.value)}
                                ></input>
                                <div className="row">
                                    <div className="col text-center mb-5">
                                        <Link className="navigation-link-register" to="/register">Belum ada akun? Tekan link ini untuk registrasi!</Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center mt-3">
                                        <button className="btn btn-login">Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
    );
}

export default Login;