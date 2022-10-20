import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, Route, useNavigate, BrowserRouter, BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import Logo from '../components/Logo';
import {DragAndDrop} from './DragAndDrop';
import {FileUpload} from '../utils/FileUpload';
import { BoxDragAndDrop } from './BoxDragAndDrop';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {ImageSelected} from "./ImageSelected";
import ImageUploading from "react-images-uploading";
import {useUploadImage} from "../hooks/useUploadImage";

const FILELOADER_URL = '/loadFiles';

export const FileLoader = () => {

    const CLOUD_NAME = 'dwx9rqfjh';
    const UPLOAD_PRESET = 'z87owhgv';
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const [file, setFile] = useState("");
    const [url, setUrl] = useState("");

    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const upload = async () => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', UPLOAD_PRESET);
        data.append('cloud_name', CLOUD_NAME);

        fetch(cloudinaryUrl,
            {method: "POST",
                body: data})
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)})
            .then(setSuccess(true))
          
            //const data2 = await response.json()
            .catch(err => console.log(err))
       
    }

    return (
        <>
            {success ? (
                    <section style={{backgroundColor: 'grey'}}>
                        <h1>Foto cargada con Exito!</h1>
                        <img src={url} alt="Preview"/>
                        <button onClick={() => {navigate(-1);
                          window.localStorage.setItem("url",  JSON.stringify (url))}}> Volver </button>

                    </section>)

                : (<section style={{backgroundColor: 'grey'}}>
                    <Logo/>

                    <h1>
                        <span>Cargar fotos</span><br/>
                    </h1>

                    <div className="App">
                        <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                        {file ? <img alt="Preview" height="60" src={URL.createObjectURL(file)}/> : null}
                        <button onClick={upload}>Upload</button>
                    </div>

                    <url/>

                    <image src={url}/>

                </section>)}
        </>
    );
}
