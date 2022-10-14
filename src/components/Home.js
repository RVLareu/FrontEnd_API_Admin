import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Logo from '../components/Logo';

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <section style={{backgroundColor: 'grey'}}>
            <p>Home</p>
            <br />
            <Logo />
            <p>Estas logueado!</p>
            <br />
            <Link to="/inquilino">Ir a seccion inquilino</Link>
            <br />
            <Link to="/admin">Ir a seccion casero </Link>
            <br />
            <Link to="/linkpage">Ir a la seccion de enlaces</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>)
}

export default Home
