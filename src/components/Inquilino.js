import { Link } from "react-router-dom"

const Editor = () => {
    return (
        <section>
            <h1>Pagina inquilino</h1>
            <br />
            <p>Para ver esto deberia tener el rol inquilino.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Editor