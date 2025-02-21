import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UpdateData from './UpdateData';
import axios from '../api/axios';
import swal from 'sweetalert2';
import {Image} from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";


const DELETE_PUBLICATION_URL = '/deletePublication/';
const DELETE_PROPERTY_URL = '/deleteProperty/';

const viewPublication = async (props) => {
  window.localStorage.setItem("view_publication", JSON.stringify (props))
  window.location.href="/viewPublication/"
}


export default function CardPublication(props) {
    let username = props.username

//Solución provisoria
    
    const [images, setImages] = useState([]);
    
    const list = [];

    const loadImages = () => {
      if (!username){
        console.log("no autorizado")
        //navigate("/login");
        window.location.href = "/login";
        return;
      } 
      const params = new URLSearchParams([['property_id', props.Publication.property_id]]);
    
      axios.post('/fetchAllPropertyImages/', {},{ params })
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
    
    images.map(item => {
                  list.push(item.link)
                })
  
  useEffect(() => {
    loadImages();
    }, []);
  
    return (
    
      <Card variant="outlined" sx={{m:1}}>
        <React.Fragment>
          <CardContent>
            
           <div sx={{display:'flex',flexWrap: 'wrap' }}>
                  <img alt="Preview" height="150" src={list[0]} />
           </div>
             
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              {props.Publication.title}
            </Typography>
            <Typography variant="h6" component="div">
              {props.Publication.description}
            </Typography>
            
            <Typography variant="body2">
              {props.Publication.price}
            </Typography>
          </CardContent>
          <CardActions sx={{justifyContent:'center'}}>
            <Button variant="contained" onClick={()=>{viewPublication(props)}} color="success">Consultar</Button>
          </CardActions>
        </React.Fragment>
      </Card>

  );
}
