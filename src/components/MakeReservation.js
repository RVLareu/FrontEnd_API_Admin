import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../components/Logo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router-dom'
import { PrecisionManufacturing } from "@mui/icons-material";
import { format } from 'date-fns';
import DatePicker from 'react-date-picker';
import Time from 'react-time';
import 'react-day-picker/dist/style.css';
//import subDays from "date-fsn/subDays";
import Moment from "moment";

const PROPERTYHANDLER_URL = '/updateProperty/';


const MakeReservation = () => {


    let props = window.localStorage.getItem("view_publication")
    let parse_publication = (JSON.parse(props)).Publication
    
    //console.log(props)

    const userRef = useRef();
    const errRef = useRef();
    
    /*Este es el parametro id que recupero de props/*/


    /*Recomporner Json*/



    /*Datos publicacion*/
    
    const [id_publication, setPublicationID] = useState(parse_publication.id);
    const [email_user, setEmail] = useState('');
    const [fechaInicio, setFechaInicio] = useState(new Moment().toDate());
    const [fechaFin, setFechaFin] = useState(new Moment().toDate());
    //const [fechaInicio, setFechaInicio] = useState("");
    //const [fechaFin, setFechaFin] = useState("");
    
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);    
    const [selected, setSelected] = useState('');
    const [selected1, setSelected1] = useState('');
    const navigate = useNavigate();
    
    
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
        
            
            console.log("Fechas")
            console.log(fechaInicio)
            console.log(fechaFin)
            
            const response = axios.post('/reserve',
                JSON.stringify({
                    "start_date": fechaInicio,"end_date": fechaFin,
                    "email_user": username, 'publication_id': id_publication
                }),
                {
                    headers: { 'Content-Type': 'application/json'
                     }
                }

            );
              
             

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
    
  /*  useEffect((props) => {
      window.localStorage.setItem("keep_publication", JSON.stringify (props))
      
      props = window.localStorage.getItem("keep_publication")
      parse_publication = (JSON.parse(props)).Publication
      parse_properties = JSON.parse(props).Property
    })*/

    let footer = <p>Seleccione una fecha</p>;
            if (selected) {
                footer = <p>You picked {format(selected, 'PP')}.</p>;
             }
             if (selected1) {
                footer = <p>You picked {format(selected1, 'PP')}.</p>;
             }
  

    return ( 

           
        <>
            {success ? (
                <section style={{ backgroundColor: 'grey' }}>
                    <h1>Reserva realizada con exito!</h1>
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
                    <h2>Ingrese los datos de la reserva</h2>
                    <form className="custom" onSubmit={handleSubmit}>

                       < br/>
                       < br/>
                       
                        <label htmlFor="titulo">
                            Fecha de ingreso:
                        </label>
                        
                        <br/>
                        
                        <DatePicker
                          dateFormat="yyyy/MM/dd"
                          format="yyyy/MM/dd"
                          value={fechaInicio}
                          mode="single"
                          //minDate={subDays(new Date(), 0)}
                          selected={fechaInicio}
                          onSelect={setFechaInicio}
                          onChange={(date) => {setFechaInicio(new Moment(date).toDate())}}
                          footer={footer}
                        />

                        <br/>
                        
                        <label htmlFor="descrPubl">
                            Fecha de egreso:
                        </label>
                        
                        <br/>
                        
                        <DatePicker
                          dateFormat="yyyy/MM/dd"
                          format="yyyy/MM/dd"
                          value={fechaFin}
                          mode="single"
                          selected={fechaFin}
                          onSelect={setFechaFin}
                          onChange={(date) => {setFechaFin(new Moment(date).toDate())}}
                          footer={footer}
                        />

                        <br/>

                        <button >Reservar</button>
                        
                        <button onClick={() => {navigate(-1)
                          }}> Volver </button>
                    </form>
                </section>
            )}
        </>
    )
}

export default MakeReservation

