import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from '../api/axios';
import Card from "../components/Card"
import { Box } from '@mui/material';

const ShowsLodgings = () => {

  const [lodgings, setLodgings] = useState([]);

  let username = window.localStorage.getItem("username")
    
  
  const loadLodgings = () => {
    if (!username){
      console.log("no autorizado")
      //navigate("/login");
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['email_user', username]]);
    
    axios.post('/fetchAllUserProperties/', {},{ params })
    .then((response) => {
      setLodgings(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }



  useEffect(() => {
    loadLodgings();
    }, []);


  return (
    
    <Box sx={{display:'flex',flexWrap: 'wrap' }}>
        {lodgings.map(item => {
          return (
              <Card key={item.id} {...item} username={username} updateLodgings={loadLodgings} />
          )}
        )}   
    </Box>
  
  )
}

export default ShowsLodgings
