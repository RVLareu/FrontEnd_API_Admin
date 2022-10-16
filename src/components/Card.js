import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DELETE_PROPERTY_URL = '/deleteProperty/';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

 const deleteProperty= async (property_id) => {
   
    console.log(property_id);
    
    // if button enabled with JS hack
    
   /* try {
        const response = await axios.post(DELETE_PROPERTY_URL,
            JSON.stringify({ '':a }),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
      
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No hay respuesta del servidor');
        } else if (err.response?.status === 400) {
            setErrMsg('El nombre de usuario no esta disponibles');
        } else {
            setErrMsg('el registro fallo')
        }
        errRef.current.focus();
    }*/
}



export default function Cards(props) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
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
    <CardActions>
      <Button style={{ color:'blue', fontSize: 20 }} size="small" href ={"/modifyData/"+props.id}>Modificar datos de la propiedad</Button>
      <Button style={{ color:'blue', fontSize: 20 }} size="small"  onClick={()=>{deleteProperty(props.id)}}>Eliminar propiedad</Button>
    </CardActions>
  </React.Fragment>
      </Card>
    </Box>
  );
}