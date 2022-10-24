import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import Logo from '../components/Logo';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router-dom'
import { PriceChange } from "@mui/icons-material";

const PROPERTYHANDLER_URL = '/updateProperty/';

const MakePublication = () => {


    let props = window.localStorage.getItem("publicate_props")
    let parse = JSON.parse(props)
    console.log(props)

    const userRef = useRef();
    const errRef = useRef();
    /*Este es el parametro id que recupero de props/*/


    /*Recomporner Json*/



    /*Datos publicacion*/
    const [id_property, setPropertyID] = useState(parse.id);
    const [titulo, setTitulo] = useState('');
    const [provincia, setProvincia] = useState(parse.province);
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState(parse.description);
    const [email_user, setEmail] = useState(parse.email_user);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack floors

        let username;
        if (!window.localStorage.getItem("username")) {
            console.log("no autorizado")
            //navigate("/login");
            window.location.href = "/login";
            return;
        } else {
            username = window.localStorage.getItem("username")
        }

        try {
            setEmail(username)
            console.log(username)
                     

            const json = JSON.stringify({
                'title': titulo, 'description': descripcion, 'price': precio, 'property_id': id_property, 'email_user': username
            })

            const headers = { 'Content-Type': 'application/json' }

            axios({
                method: 'post', url: '/createPublication', data: json,
                 headers: headers
            });

            setSuccess(true);


        } catch (err) {
            if (!err?.response) {
                setErrMsg('No hay respuesta del servidor');
            } else if (err.response?.status === 400) {
                setErrMsg('error del tipo 400');
            } else {
                setErrMsg('el registro fallo')
            }
            errRef.current.focus();

            setErrMsg(null)
        }
    }



    return (
        <>
            {success ? (
                <section style={{ backgroundColor: 'grey' }}>
                    <h1>Publicacion Realizada con exito!</h1>
                    <p>
                        <a href="/">Ir a la pagina principal</a>
                        <br />
                        <a href="/showPublication">Ir a publicaciones</a>

                    </p>
                </section>
            ) : (

                <section style={{ backgroundColor: 'grey' }}>
                    <Logo />
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Ingrese los datos de la propiedad</h1>
                    <form class="custom" onSubmit={handleSubmit}>


                        <label htmlFor="titulo">
                            Titulo:

                        </label>
                        <input
                            type="text"
                            id="titulo"
                            onChange={(e) => setTitulo(e.target.value)}
                            value={titulo}
                            required

                        />



                        <label htmlFor="descripcion">
                            Descripcion:

                        </label>
                        <input
                            type="text"
                            id="descripcion"
                            onChange={(e) => setDescripcion(e.target.value)}
                            value={descripcion}
                            required

                        />

                        <label htmlFor="precio">
                            Precio:

                        </label>
                        <input
                            type="text"
                            id="precio"
                            onChange={(e) => setPrecio(e.target.value)}
                            value={precio}
                            required

                        />

                        <br />

                        <button >Realizar Publicación</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default MakePublication
