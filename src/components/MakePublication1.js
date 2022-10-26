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
import { PrecisionManufacturing } from "@mui/icons-material";

const PROPERTYHANDLER_URL = '/updateProperty/';

const MakePublication = () => {


    let props = window.localStorage.getItem("update_publication")
    let parse_publication = (JSON.parse(props)).Publication
    let parse_properties = JSON.parse(props).Property
    console.log(props)

    const userRef = useRef();
    const errRef = useRef();
    /*Este es el parametro id que recupero de props/*/


    /*Recomporner Json*/



    /*Datos publicacion*/
    const [id_property, setPropertyID] = useState('');
    const [id_publication, setPublicationID] = useState('');
    const [titulo, setTitle] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [email_user, setEmail] = useState('');
    const [precio, setPrecio] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    
    const [direccion, setDireccion] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [pais, setPais] = useState('');
    const [habitaciones, setHabitaciones] = useState('');
    const [banios, setBanios] = useState('');
    const [personas, setPersonas] = useState('');
    let [foto, setFoto] = useState('');



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
            foto = window.localStorage.getItem("url")
            const response = await axios.post('/createProperty',
                JSON.stringify({
                    'direction': direccion,'province': provincia,  'location': localidad,
                    'country': pais, 'toilets': banios, 'rooms':habitaciones, 'people': personas, 'description': descripcion, 'link': foto, 'email_user': username
                }),
                {
                    headers: { 'Content-Type': 'application/json' }
                },

            );
            
         
            
            const response_2 = await axios.post('/createPublication',
            JSON.stringify({
                'title': titulo, 'description': descripcion, 'price': precio, 'property_id': response.data.id, 'email_user': username
            }),
            {
                headers: { 'Content-Type': 'application/json' }
            },

        );

            
           




            //const params = new URLSearchParams();
            //params.append('property_id', id_property)

            

          





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
                    <h1>Propiedad actualizada con exito!</h1>
                    <p>
                        <a href="/">Ir a la pagina principal</a>
                        <br />
                        <a href="/showPublication">Ir a la pagina de publicaciones</a>
                    </p>
                </section>
            ) : (

                <section style={{ backgroundColor: 'grey' }}>
                    <Logo />
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2>Ingrese los datos de la publicación</h2>
                    <form class="custom" onSubmit={handleSubmit}>

                        <br />
                        <Link to="/fileLoaderGallery2">Cargar Fotos</Link>


                        <label htmlFor="titulo">
                            Titulo:

                        </label>
                        <input
                            type="text"
                            id="titulo"
                            onChange={(e) => setTitle(e.target.value)}
                            value={titulo}
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

                        <h2>Ingrese los datos de la propiedad</h2>

                        <label htmlFor="direccion">
                            Direccion:

                        </label>
                        <input
                            type="text"
                            id="direccion"
                            onChange={(e) => setDireccion(e.target.value)}
                            value={direccion}
                            required

                        />

                        <label htmlFor="provincia">
                            Provincia:

                        </label>
                        <input
                            type="text"
                            id="provincia"
                            onChange={(e) => setProvincia(e.target.value)}
                            value={provincia}
                            required

                        />


                        <label htmlFor="localidad">
                            Localidad:

                        </label>
                        <input
                            type="text"
                            id="localidad"
                            onChange={(e) => setLocalidad(e.target.value)}
                            value={localidad}
                            required

                        />

                        <label htmlFor="pais">
                            Pais:

                        </label>
                        <input
                            type="text"
                            id="pais"
                            onChange={(e) => setPais(e.target.value)}
                            value={pais}
                            required

                        />
                        <br />

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Baños</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={banios}
                                    label="Baños"
                                    onChange={(e) => setBanios(e.target.value)}
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <br />

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Habitaciones</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={habitaciones}
                                    label="Habitaciones"
                                    onChange={(e) => setHabitaciones(e.target.value)}
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <br />


                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Personas</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={personas}
                                    label="Habitaciones"
                                    onChange={(e) => setPersonas(e.target.value)}
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

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

                        <br/>


                        <button >Crear publicación</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default MakePublication

