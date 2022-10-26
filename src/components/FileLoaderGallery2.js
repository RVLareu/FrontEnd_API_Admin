import React, { Component } from 'react';
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, Route, useNavigate, BrowserRouter, BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import Logo from '../components/Logo';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ImageUploading from "react-images-uploading";


export class FileLoaderGallery2 extends Component {
   
    static contextTypes = {
       router: () => true,
       }

    fileObj = [];
    fileArray = [];

    email_user = window.localStorage.getItem("username");
    
    constructor(props) {
        super(props)
            
        this.state = {
            file: [null]
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }
    
    handleBack = () => {
       this.props.history.goBack()
      }
    
    
    upload = async () => {

       const CLOUD_NAME = 'dwx9rqfjh';
       const UPLOAD_PRESET = 'z87owhgv';
       const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

       //const [file, setFile] = useState("");
       //const [url, setUrl] = useState("");
 
       //const [success, setSuccess] = useState(false);
       //const navigate = useNavigate();


        const data = new FormData();
        const urls = [];
        
        for (let i = 0; i < this.fileObj[0].length; i++) {
            
           data.append('file', this.fileObj[0][i]);
           data.append('upload_preset', UPLOAD_PRESET);
           data.append('cloud_name', CLOUD_NAME);
           
           urls[i]=this.fileObj[0][i];

           fetch(cloudinaryUrl,
               {method: "POST",
                   body: data})
               .then(resp => resp.json())
               //.then(data => {
               //    setUrl(data.url)})
               //.then(setSuccess(true))
          
               //const data2 = await response.json()
               .catch(err => console.log(err))
             }
             
           window.localStorage.setItem("urls",  urls);  
       
    }
    
    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })
    }
   
    uploadFiles(e) {
        e.preventDefault()
        this.upload()
        console.log(this.state.file)
        window.localStorage.setItem("username", this.email_user)
        
    }
    
   
    render() {
   
        return (
                <section style={{ backgroundColor: 'grey' }}>
                  <Logo/>
                  <div className="form-group multi-preview">
                      {(this.fileArray || []).map(url => (
                          <img src={url} alt='preview' height="100"/>
                      ))}
                  </div>
                  
                    <div className="form-group">
                        <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                    </div>
                    <button onClick={this.uploadFiles}>Upload</button>
                    <a href="/makePublication" onClick="windows.history.go(-1); return false;">Volver</a>
            </section>
        )
    }
}

export default FileLoaderGallery2
