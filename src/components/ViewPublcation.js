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
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';



const ViewPublication = () => {


    let props = window.localStorage.getItem("view_publication")
    let parse_publication = (JSON.parse(props)).Publication
    let parse_properties = JSON.parse(props).Property
    //console.log(props)
    
    
    const navigate = useNavigate();    

    //const userRef = useRef();
    //const errRef = useRef();
    /*Este es el parametro id que recupero de props/*/


    /*Recomporner Json*/



    /*Datos publicacion*/
    /*const [id_property, setPropertyID] = useState(parse_properties.id);
    const [id_publication, setPublicationID] = useState(parse_publication.id);
    const [titulo, setTitle] = useState(parse_publication.title);
    const [descripcion, setDescripcion] = useState(parse_publication.description);
    const [email_user, setEmail] = useState(parse_publication.email_user);
    const [precio, setPrecio] = useState(parse_publication.price);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    
    const [direccion, setDireccion] = useState(parse_properties.direction);
    const [localidad, setLocalidad] = useState(parse_properties.location);
    const [provincia, setProvincia] = useState(parse_properties.province);
    const [pais, setPais] = useState(parse_properties.country);
    const [habitaciones, setHabitaciones] = useState(parse_properties.rooms);
    const [banios, setBanios] = useState(parse_properties.toilets);
    const [personas, setPersonas] = useState(parse_properties.people);
    let [foto, setFoto] = useState('');*/


    return (
       
                <section style={{ backgroundColor: 'grey' }}>
                    <Logo />

                    <h2>Datos de la publicación</h2>

                        <div className="form-group multi-preview">
                          {(props.Property.images || []).map(url => (
                          <img src={url} alt="Preview" />
                          ))}
                       </div>
                        <br />

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                           {props.Publication.title}
                       </Typography>
                       
                        <Typography variant="h5" component="div">
                         {props.Publication.description}
                       </Typography>
            
                       <Typography variant="body2">
                         {props.Publication.price}
                       </Typography>

                       <Typography variant="body2">
                         {props.Publication.price}
                       </Typography>
                       
           
                       <Typography variant="body2">
                         {props.Property.direction}
                       </Typography>

                       <Typography variant="body2">
                         {props.Property.province}
                       </Typography>
                       
                       <Typography variant="body2">
                         {props.Property.location}
                       </Typography>
                       
                       <Typography variant="body2">
                         {props.Property.country}
                       </Typography>
                       
                       <Typography variant="body2">
                         {props.Property.toiletes}
                       </Typography>
                       
                       <Typography variant="body2">
                         {props.Property.rooms}
                       </Typography>
                       
                       <Typography variant="body2">
                         {props.Property.people}
                       </Typography>
                       
                       <Typography variant="body2">
                         {props.Property.description}
                       </Typography>
                       
                       <button onClick={navigate(-1)}> Volver </button>

                </section>
            
    )
}

export default ViewPublication
