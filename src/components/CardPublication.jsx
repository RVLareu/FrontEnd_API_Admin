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


const DELETE_PROPERTY_URL = '/deletePublication/';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const update = async (props) => {
  window.localStorage.setItem("update_publication", JSON.stringify (props))
  window.location.href="/updatePublications/"
}



const deletePublication = async (property_id, username, updateFunction) => {

  console.log(property_id);
  const params = new URLSearchParams([['publication_id', property_id], ['email_user', username]]);
  swal.fire({
    title: "Confirmar",
    text: "¿Confirmas que deseas borrar la propiedad?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Si, borrar!',
    cancelButtonText: 'No',
    dangerMode: true}).then(function(result) {
      if (result['isConfirmed']) {
        axios.delete(DELETE_PROPERTY_URL,{ params })
        .then((response) => {
          updateFunction();
          
        })
        .catch((error) => {
          console.log(error);
        });
      }
      window.location.href="/showPublication"
      }
    )

}



export default function Cards(props) {
    let username = props.username
  

    return (

      <Card variant="outlined" sx={{m:1}}>
        <React.Fragment>
          <CardContent>
            <img alt="Preview" height="100" src={props.Property.link} />
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {props.Publication.title}
            </Typography>
            <Typography variant="h5" component="div">
              {props.Publication.description}
            </Typography>
            
            <Typography variant="body2">
              {props.Publication.price}
            </Typography>
          </CardContent>
          <CardActions sx={{justifyContent:'center'}}>
            <Button variant="contained" onClick={()=>{update(props)}} color="success">Modificar</Button>
            <Button variant="contained" onClick={()=>{deletePublication(props.Publication.id, username, props.updateLodgings)}} color="success">Eliminar</Button>
            
          </CardActions>
        </React.Fragment>
      </Card>

  );
}
