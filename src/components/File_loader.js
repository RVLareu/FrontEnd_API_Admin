import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import Logo from '../Logo';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const FILELOADER_URL = '/loadFiles';

const CargaFotos = () => {

    const userRef = useRef();
    const errRef = useRef();


    /*Datos publicacion*/
    const [link, setLink] = useState('');
    const [email_user, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack floors

        let username;
        if (!window.localStorage.getItem("username")){
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
            const response = await axios.post('/loadFiles',
                JSON.stringify({
                    'link': link}),
                {
                    headers: { 'Content-Type': 'application/json' }
                },

            );
            setSuccess(true);

            //console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))

            //clear state and controlled inputs

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No hay respuesta del servidor');
            } else if (err.response?.status === 400) {
                setErrMsg('Error del tipo 400');
            } else {
                setErrMsg('La carga falló')
            }
            errRef.current.focus();

            setErrMsg(null)
        }
    }

    return (
        <>
            {success ? (
                <section style={{ backgroundColor: 'grey' }}>
                    <h1>Foto cargada con exito!</h1>
                    <p>
                        <a href="/">Ir a la pagina principal!</a>
                    </p>
                </section>
            ) : (
                <section style={{ backgroundColor: 'grey' }}>
                    <Logo />
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Ingrese las fotos de la propiedad</h1>
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="link">
                            Link:

                        </label>
                        <input
                            type="text"
                            id="link"
                            onChange={(e) => setLink(e.target.value)}
                            value={link}
                            required

                        />

                        <br/>

                        <button >Cargar Fotos</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default CargaFotos


const multer = require("../components/Multer");

const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: 'dwx9rqfjh',
    api_key: '941379813488677',
    api_secret: 'yKXNuX7eIkwuCCRyIKb97IPk8OU'
});

function App() {
    const [file, setFile] = useState(null);

    const CLOUD_NAME = "CLOUD_NAME"
    const UPLOAD_PRESET = "UPLOAD_PRESET"

    const upload = async () => {
        const data1 = new FormData();
        data1.append("file", file);
        data1.append("upload_preset", CLOUD_NAME);
        const response = await fetch(`https://api.cloudinary.com/v1_1/${UPLOAD_PRESET}/upload`,
            { method: "POST", body: data1 })
        const data2 = await response.json()
        console.log(data2) // reemplazar con un mensaje de éxito o la acción deseada
    };

    return (
        <div className="App">
            <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
            <button onClick={upload}>Upload</button>
        </div>
    );
}

app.post("/upload", uploader.single("file"), async (req, res) => {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    return res.json({
        success: true,
        file: upload.secure_url,
    });
});

module.exports = cloudinary;
