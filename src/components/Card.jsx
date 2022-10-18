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


const DELETE_PROPERTY_URL = '/deleteProperty/';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const update = async (props) => {

  
  window.localStorage.setItem("update_props", JSON.stringify (props))
  
  window.location.href="/updateData/"

 
}

const deleteProperty = async (property_id, username, updateFunction) => {

  console.log(property_id);
  const params = new URLSearchParams([['property_id', property_id], ['email_user', username]]);
  swal.fire({
    title: "Confirmar",
    text: "¿Confirmas que deseas borrar la propiedad?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Si, borrar!',
    cancelButtonText: 'No',
    dangerMode: true}).then(function(result) {
      if (result['isConfirmed']) {
        axios.post('/deleteProperty/', {},{ params })
        .then((response) => {
          updateFunction();
        })
        .catch((error) => {
          console.log(error);
        });
      }
      }
    )

}



export default function Cards(props) {
    let username = props.username
  

    return (

      <Card variant="outlined" sx={{m:1}}>
        <Button  sx={{color:'red'}} onClick={() => { deleteProperty(props.id, username, props.updateLodgings) }}> X </Button>
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {props.country}
            </Typography>
            <Typography variant="h5" component="div">
              {props.description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {props.location}
            </Typography>
            <Typography variant="body2">
              {props.direction}
            </Typography>
          </CardContent>
          <CardActions sx={{justifyContent:'center'}}>
            <Button variant="contained" onClick={()=>{update(props)}} color="success">Modificar</Button>
            <Button variant="contained" onClick={()=>{deleteProperty(props.id, username, props.updateLodgings)}} color="success">Eliminar</Button>
          </CardActions>
        </React.Fragment>
      </Card>

  );
}