import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import Card from "../components/Card";
import { Avatar, Box, Button, Divider, Paper, Rating, TextField, Typography } from '@mui/material';
import { Add, ContactMail, ContactMailOutlined, Description, DescriptionOutlined, Edit, LocationCity, LocationOn, LocationOnOutlined, PersonOutline, VerifiedOutlined, VerifiedUserOutlined, Work, WorkOutline, WorkOutlineOutlined } from '@mui/icons-material';




const EditProfile = () => {

  const navigate = useNavigate();

  let username = window.localStorage.getItem("username")
    
  if (!username){
    console.log("no autorizado")
    //navigate("/login");
    window.location.href = "/login";
    return;
  } 

  // useEffect(() => {
  //   //loadLodgings();
  //   }, []);


  return (
    <Box
      component="form"
      noValidate
      autoComplete="off">

      <Avatar
        alt={username.toLocaleUpperCase()}
        src="broken-image.jpg"
        sx={{ width: 100, height: 100 , marginTop: "10px", marginBottom: "20px"}}
      />

      <TextField
          id="outlined-read-only-input"
          label="Nombre"
          defaultValue="Nombre"
        />

      <TextField
          id="outlined-read-only-input"
          label="Biografia"
          defaultValue="Mi biografia"
        />

      <TextField
          id="outlined-read-only-input"
          label="Ocupación"
          defaultValue="Mi ocupacion"
        />

      <TextField
          id="outlined-read-only-input"
          label="Ubicación"
          defaultValue=""
        />

      <Button sx={{marginTop: "10px"}} variant="contained" onClick={() => {alert("TO DO")}} >
        Aceptar
      </Button>
  </Box>
  
  )
}

export default EditProfile
