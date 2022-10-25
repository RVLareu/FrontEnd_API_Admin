import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import Card from "../components/Card";
import { Avatar, Box, Button, CircularProgress, Divider, Paper, Rating, TextField, Typography } from '@mui/material';
import { Add, ContactMail, ContactMailOutlined, Description, DescriptionOutlined, Edit, LocationCity, LocationOn, LocationOnOutlined, PersonOutline, VerifiedOutlined, VerifiedUserOutlined, Work, WorkOutline, WorkOutlineOutlined } from '@mui/icons-material';


import swal from 'sweetalert2';

const EditProfile = () => {


  const navigate = useNavigate();

  let username = window.localStorage.getItem("username")

  const [profileData, setProfileData] = useState();
    
  if (!username){
    console.log("no autorizado")
    //navigate("/login");
    window.location.href = "/login";
    return;
  } 

  if(!profileData){
    const params = new URLSearchParams([['user_email', username]]);

    axios.get('/getProfile/',{ params: params })
    .then((response) => {
      setProfileData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }


  const updateProfile = async(e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget);

    const body = {
        'email': username, 'name': form.get("name"), 'bio': form.get("bio"), 'location': form.get("location"), 'ocupation': form.get("ocupation")
    }

    const headers = { 'Content-Type': 'application/json' }


    axios.put('/updateProfile/', JSON.stringify(body),{headers: headers})
    .then((response) => {
      swal.fire({title:"Exito", text: "Perfil actualizado exitosamente", icon:"success"}).then(() => {navigate("/profile")})
    })
    .catch((error) => {
      console.log(error);
      swal.fire({title:"Error", text: error, icon:"error"})
    });
  }


  return (
    <Paper sx={{width: 700, paddingBottom: "30px", display: 'flex', flexDirection:'column', alignItems:'center', textAlign: 'left'}}
      noValidate
      component="form"
      onSubmit={(e) => updateProfile(e)}
      autoComplete="off">
      {profileData ? <>

          <div style={{width: "60%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"}}>
          <Avatar
            alt={username.toLocaleUpperCase()}
            src="broken-image.jpg"
            sx={{ width: 100, height: 100 , marginTop: "10px", marginBottom: "20px"}}
          />
          <Button sx={{height: "50px"}} onClick={(e) => {e.preventDefault();}}> Cambiar imagen </Button>
          </div>

          {/* <TextField
              name="email"
              label="E-mail"
              defaultValue={profileData.email}
              sx={{margin: "10px 0 10px 0", width: "450px"}}
            /> */}

          <TextField
              name="name"
              label="Nombre"
              defaultValue={profileData.name}
              sx={{margin: "10px 0 10px 0", width: "450px"}}
            />

          <TextField
              name="bio"
              label="Biografia"
              defaultValue={profileData.bio}
              sx={{margin: "10px 0 10px 0", width: "450px"}}
              multiline
            />

          <TextField
              name="ocupation"
              label="Ocupación"
              defaultValue={profileData.ocupation}

              sx={{margin: "10px 0 10px 0", width: "450px"}}

            />

          <TextField
              name="location"
              label="Ubicación"
              defaultValue={profileData.location}
              sx={{margin: "10px 0 10px 0", width: "450px"}}

            />

          <Button sx={{marginTop: "10px"}} variant="contained" type="submit">
            Aceptar
          </Button>
        </>
     :<CircularProgress></CircularProgress>}
  </Paper>
  
  )
}

export default EditProfile
