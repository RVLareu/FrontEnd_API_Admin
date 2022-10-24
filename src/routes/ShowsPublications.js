import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import Card from "../components/CardPublication";
import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const ShowsPublications = () => {

  const navigate = useNavigate();

  const [publications, setPublications] = useState([]);

  let username = window.localStorage.getItem("username")
    
  
  const loadPublications = () => {
    if (!username){
      console.log("no autorizado")
      //navigate("/login");
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['email_user', username]]);
    
    axios.post('/fetchAllUserPublications/', {},{ params })
    .then((response) => {
      setPublications(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }



  useEffect(() => {
    loadPublications();
    }, []);


  return (
    <>
    { (publications && publications.length > 0) ? 
      <Box sx={{display:'flex',flexWrap: 'wrap' }}>
        {publications.map(item => {
          return (
              <Card key={item.id} {...item} username={username} updatePublications={loadPublications} />
          )}
        )}   
      </Box>
      : <Typography style={{color: "black"}} variant="h6" gutterBottom>
        No tenés publicaciones realizadas
      </Typography>

      
    }

      <Button variant="contained" onClick={() => navigate("/makePublication")} endIcon={<Add />}>
        Realizar una publicación
      </Button>
     
    
    </>
  
  )
}

export default ShowsPublications
