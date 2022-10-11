import { Link } from "react-router-dom"
import logo from "../images//sign-gedc253aab_1280.png";


const LinkPage = () => {
    return (
        <section style={{backgroundColor: 'grey'}}>
                <h1 style={{ color:'orange', fontSize: 20 }}>#Hospedate</h1>
                <h1 style={{ color:'orange', fontSize: 20 }}>Ahora</h1>
                <img style={{height: 100, width: 100, alignSelf:'center' }} src={logo} alt="Logo" />
                <br />
            <h1>Enlaces</h1>
            <br />
            <h2>Publicos</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Privados</h2>
            <Link to="/">Home</Link>
            <Link to="/inquilino">Pagina inquilino</Link>
            <Link to="/casero">Pagina de Caseros</Link>
        </section>
    )
}

export default LinkPage
