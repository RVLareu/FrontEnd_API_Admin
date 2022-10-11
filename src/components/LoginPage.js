import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../images//sign-gedc253aab_1280.png";

import axios from '../api/axios';
// import logo from "*.png";
const LOGIN_URL = '/user/login';

const LoginPage = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ 'email': user, 'password': pwd }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(JSON.stringify(response?.data));
            //const accessToken = response?.data?.accessToken;
            //const roles = response?.data?.roles;
            //setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('El servidor no responde');
            } else if (err.response?.status === 400) {
                setErrMsg('Contraseña o usuario incorrecto');
            } else if (err.response?.status === 401) {
                setErrMsg('No tiene autorización');
            } else {
                setErrMsg('El ingreso ha fallado');
            }
            errRef.current.focus();
        }
    }

    return (

        <section style={{backgroundColor: 'grey'}}>
            <h1 style={{ color:'orange', fontSize: 20 }}>#Hospedate</h1>
            <h1 style={{ color:'orange', fontSize: 20 }}>Ahora</h1>
            <img style={{height: 100, width: 100, alignSelf:'center' }} src={logo} alt="Logo" />
            <br />
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Ingresar</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Nombre de usuario:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Ingresar</button>
            </form>
            <p>
                Necesitas una cuenta?<br />
                <span className="line">
                    <Link to="/register">Registrate</Link>
                </span>
            </p>
        </section>

    )
}

export default LoginPage