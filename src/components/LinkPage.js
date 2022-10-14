import { Link } from "react-router-dom"
import Logo from '../components/Logo';


const LinkPage = () => {
    return (
        <section style={{backgroundColor: 'grey'}}>
            <Logo />
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
            <Link to="/cargaPropiedad">Cargar Propiedad</Link>
        </section>
    )
}

export default LinkPage
