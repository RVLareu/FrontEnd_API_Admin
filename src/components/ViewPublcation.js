import { useRef, useState, useEffect, useCallback, memo, useMemo } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import Logo from '../components/Logo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router-dom'
import { PrecisionManufacturing } from "@mui/icons-material";
//import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';

const ViewPublication = (() => {


    let props = window.localStorage.getItem("view_publication")
    let parse_publication = (JSON.parse(props)).Publication
    let parse_properties = (JSON.parse(props)).Property
    
    //console.log(props)
    
    
    //const navigate = useNavigate();    

    //const userRef = useRef();
    //const errRef = useRef();
    /*Este es el parametro id que recupero de props/*/


    /*Recomporner Json*/



    /*Datos publicacion*/
    const [id_property, setPropertyID] = useState(parse_properties.id);
    const [id_publication, setPublicationID] = useState(parse_publication.id);
    const [titulo, setTitle] = useState(parse_publication.title);
    const [descripcion, setDescripcion] = useState(parse_publication.description);
    const [email_user, setEmail] = useState(parse_publication.email_user);
    const [precio, setPrecio] = useState(parse_publication.price);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    //const [reservado, setReservado] = useState(false);
    
    const [direccion, setDireccion] = useState(parse_properties.direction);
    const [localidad, setLocalidad] = useState(parse_properties.location);
    const [provincia, setProvincia] = useState(parse_properties.province);
    const [pais, setPais] = useState(parse_properties.country);
    const [habitaciones, setHabitaciones] = useState(parse_properties.rooms);
    const [banios, setBanios] = useState(parse_properties.toilets);
    const [personas, setPersonas] = useState(parse_properties.people);
    
    const [images, setImages] = useState([]);
    const [answer, setAnswer] = useState('');
    const [ownerOfPublication, setOwnerOfPublication] = useState(true);
    const [questionId, setQuestionId] = useState(0);

    const handleReply = (e) => {
      axios.post('/answer/',
        {
          'question_id': questionId,
          'answer': answer
          }
          )
      .then((response) => {
        console.log(response);
        getQuestions();
      })
      .catch((error) => {
        console.log(error);
      });    
    
    }

    let username = window.localStorage.getItem("username")

    //setReservado(window.localStorage.getItem("reservado"))

    const loadImages = () => {
      if (!username){
        console.log("no autorizado")
        //navigate("/login");
        window.location.href = "/login";
        return;
      } 
      const params = new URLSearchParams([['property_id', id_property]]);
    
      axios.post('/fetchAllPropertyImages/', {},{ params })
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }


   const makeReservation = async (props) => {
     window.localStorage.setItem("make_reservation", JSON.stringify (props))
     window.location.href="/makeReservation/"
    }
    
    const calificar = async (props) => {
     window.localStorage.setItem("calificar", JSON.stringify (props))
     window.location.href="/review/"
    }
    
   /*const isReserved = memo(() => {
      if(reservado) 
        return true;
      else
        return false;
      })  */
  
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const handleAddQuestion = () => {
    // check if question not empty
    if (question.trim() === '') {
      setErrMsg('Question cannot be empty');
      return;
    }
    axios.post('/question/', {
      publication_id: id_publication,
      question: question,
      user_id: 1,
    })
    .then((response) => {
      console.log(response);
      getQuestions()
    })
    .catch((error) => {
      console.log(error);

    });
  }

  const getQuestions = () => {
    axios.get(`/question/${id_publication}`)
    .then((response) => {
      console.log(response);
      setQuestions(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }


  const theme = createTheme({
    palette: {
        primary: {
          main: '#dc9c13',
        },
        secondary:{
            main: '#e9bc65',
        } 
      },
}); 

  useEffect(() => {
    loadImages();
    getQuestions();
    }, []);


    return (    

      <ThemeProvider theme={theme}>
          <Stack direction="column" spacing={2} sx={{ width: '100vw'}}>
                
                <Stack spacing={2} direction="row" sx={{flexGrow: 1, justifyContent: 'left', alignItems: 'center',}}>

                  <Stack direction="column" spacing={4}>
                      <Typography sx={{ fontSize: 34, mt:10 }} color="text.primary" gutterBottom variant='h1' >
                          {titulo}
                      </Typography>

                      <div className="form-group multi-preview">
                        {(images || []).map(image => (
                            <img src={image.link} alt='preview' height="400"/>
                        ))}
                      </div>
                  </Stack>
                  
                  <Stack direction="column" spacing={4} sx={{flex:1, alignItems: 'center', justifyContent: 'right', width: '100%'}}>
                    <Button variant="contained" onClick={()=>{makeReservation(props)}} 
                        disabled={false} color="success" sx={{height: 'fit-content', width: 'fit-content'}}>Realizar reserva</Button>
                        
                    <Button variant="contained" onClick={()=>{calificar(props)}} 
                        disabled={true} color="success" sx={{height: 'fit-content', width: 'fit-content'}}>Calificar</Button>
                    
                    <Stack direction="column" spacing={4}>

                      <Typography variant="p1" color='black'>
                        {banios} baños
                      </Typography>

                      <Typography variant="p1" color='black'>
                        {habitaciones} habitaciones
                      </Typography>

                      <Typography variant="p1" color='black'>
                        para {personas} personas
                      </Typography>

                    </Stack>                        

                  </Stack>

                </Stack>
                
                <Stack direction="column" spacing={4}>
                  
                  <Typography var iant="body2" color='black'>
                  {pais}, {provincia}, {localidad}
                  </Typography>                    
                  
                  <Typography variant="body2" color='black' >
                    $ {precio}
                  </Typography>

                  <Typography variant="body2" color='black'>
                    {direccion}
                  </Typography>

                </Stack>
                
                <Stack spacing={2} direction="row" sx={{width: '100%'}}>
                    <TextField
                              sx={{width: '80%', ml: 5}} 
                              id="outlined-multiline-static"
                              label="Realiza una pregunta"
                              multiline
                              rows={4}
                              defaultValue="Buenas, tengo una consulta..."
                              onChange={(e) => setQuestion(e.target.value)}
                    />
                    <Button variant="contained" color="success" sx={{height: 'fit-content'}} onClick={handleAddQuestion}>Enviar</Button>
                </Stack>
                <List sx={{color: 'black'}}>
                  {questions.map((question) => (
                    <ListItem key={question.id} sx={{ml: 5}}>
                      <Stack sx={{width: '80%'}} spacing={2}>
                        <ListItemText
                          primary={question.Question.question}
                          secondary={question.Question.answer ? question.Question.answer : null}
                        />
                        {ownerOfPublication && (question.Question.answer === null) ?
                        (<>
                              <TextField 
                                key={question.Question.id}
                                multiline 
                                label="Respuesta"
                                rows={3}
                                onChange={(e) => {
                                  setAnswer(e.target.value)
                                  setQuestionId(question.Question.id)
                                }}

                              />
                              <Button variant="contained" color="success" sx={{height: 'fit-content', width: 'fit-content'}} onClick={handleReply}>Responder</Button> 
                              </>
                          )
                          : !ownerOfPublication ?  (
                            <ListItemText
                            secondary={'Sin respuesta'}
                          />
                          ) : null
                        }

                      </Stack>
                    </ListItem>
                  ))}
                </List>
          </Stack>
    </ ThemeProvider>
    )
})

export default ViewPublication

