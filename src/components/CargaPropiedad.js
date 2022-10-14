import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import Logo from '../components/Logo';


const PROPERTYHANDLER_URL = '/registerProperty/';

const CargaPropiedad = () => {

    const userRef = useRef();
    const errRef = useRef();


    /*Datos publicacion*/
    const [titulo, setTitulo] = useState('')
    const [direccion, setDireccion] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [pais, setPais] = useState('');
    const [pisos, setPisos] = useState('');
    const [habitaciones, setHabitaciones] = useState('');
    const [banios, setBanios] = useState('');
    const [camas, setCamas] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);




    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack floors

        
        try {
            const response = await axios.post(PROPERTYHANDLER_URL,
                JSON.stringify({ 'title': titulo, 'direction': direccion, 'location':localidad, 'province': provincia,
                'country': pais, 'floors': parseInt (pisos), 'rooms': parseInt (habitaciones), 'toilets': parseInt(banios), 'beds': parseInt(camas)                                       
            }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            // TODO: remove console.logs before deployment
           // console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))

            console.log (camas);
          
            //clear state and controlled inputs
           
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No hay respuesta del servidor');
            } else if (err.response?.status === 400) {
                setErrMsg('error del tipo 400');
            } else {
                setErrMsg('el registro fallo')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section style={{ backgroundColor: 'grey' }}>
                    <h1>Propiedad cargada con exito!</h1>
                    <p>
                        <a href="/">Ir a la pagina principalr</a>
                    </p>
                </section>
            ) : (
                <section style={{ backgroundColor: 'grey' }}>
                    <Logo />
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Ingrese los datos de la propiedad</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Titulo:

                        </label>
                        <input
                            type="text"
                            id="titulo"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setTitulo(e.target.value)}
                            value={titulo}
                            required

                        />



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

                        <label htmlFor="pisos">
                            Pisos:

                        </label>
                        <input
                            type="text"
                            id="pisos"
                            onChange={(e) => setPisos(e.target.value)}
                            value={pisos}
                            required

                        />

                        <label htmlFor="habitaciones">
                            Habitaciones:

                        </label>
                        <input
                            type="text"
                            id="habitaciones"
                            onChange={(e) => setHabitaciones(e.target.value)}
                            value={habitaciones}
                            required

                        />

                        <label htmlFor="banios">
                            Banios:

                        </label>
                        <input
                            type="text"
                            id="banios"
                            onChange={(e) => setBanios(e.target.value)}
                            value={banios}
                            required

                        />

                        <label htmlFor="camas">
                            Camas:

                        </label>
                        <input
                            type="text"
                            id="camas"
                            onChange={(e) => setCamas(e.target.value)}
                            value={camas}
                            required

                        />



                        <button >Registrar Propiedad</button>
                    </form>
                    <p>
                        Ya estas registrado?<br />
                        <span className="line">
                            <Link to="/">Ingresar</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default CargaPropiedad
