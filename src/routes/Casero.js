import { Link } from "react-router-dom";


const Admin = () => {
    return (
        <section>
            <h1>Pagina de Casero</h1>
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin