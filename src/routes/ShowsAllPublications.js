import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import CardPublication from "../components/CardPublication";
import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const ShowsAllPublications = () => {

  const navigate = useNavigate();

  const [publications, setPublications] = useState([]);

  let username = window.localStorage.getItem("username")
    
  
  const loadPublications = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 
    const params = JSON.stringify({'email_user': username});
    
    axios.post('/publications/', {},{ params })
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
      <Box sx={{display:'flex',flexWrap: 'wrap', mt: 10 }}>
        {
        publications.map(item => {
          return (
              <CardPublication key={item.Publication.id} {...item} username={username} updatePublications={loadPublications} />
          )}
        )}   
      </Box>
      : (<><Typography style={{color: "black"}} variant="h6" gutterBottom>
          No hay publicaciones realizadas.
      </Typography>

      <Typography style={{color: "black"}} variant="body2" gutterBottom>
            Podes realizar tu publicacion en <Link to="/ShowsMyPublications"> Mis publicaciones </Link>
      </Typography></>)
    }
       
    </>
  
  )
}

export default ShowsAllPublications
