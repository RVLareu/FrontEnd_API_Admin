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
    <Paper sx={{width: 700, paddingBottom: "30px", display: 'flex', flexDirection:'column', alignItems:'center', textAlign: 'left'}}
      component="form"
      noValidate
      autoComplete="off">
      <div style={{width: "60%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"}}>
      <Avatar
        alt={username.toLocaleUpperCase()}
        src="broken-image.jpg"
        sx={{ width: 100, height: 100 , marginTop: "10px", marginBottom: "20px"}}
      />
      <Button sx={{height: "50px"}}> Cambiar imagen </Button>
      </div>

      <TextField
          id="outlined-read-only-input"
          label="Nombre"
          defaultValue="Nombre"
          sx={{margin: "10px 0 10px 0", width: "450px"}}
        />

      <TextField
          id="outlined-read-only-input"
          label="Biografia"
          defaultValue="Mi biografia"
          sx={{margin: "10px 0 10px 0", width: "450px"}}
          multiline
        />

      <TextField
          id="outlined-read-only-input"
          label="Ocupación"
          defaultValue="Mi ocupacion"

          sx={{margin: "10px 0 10px 0", width: "450px"}}

        />

      <TextField
          id="outlined-read-only-input"
          label="Ubicación"
          defaultValue=""
          sx={{margin: "10px 0 10px 0", width: "450px"}}

        />

      <Button sx={{marginTop: "10px"}} variant="contained" onClick={() => {alert("TO DO")}} >
        Aceptar
      </Button>
  </Paper>
  
  )
}

export default EditProfile
