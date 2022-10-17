import React from 'react';
import { Link } from "react-router-dom";
import axios from '../api/axios';
import Card from "../components/Card"
import { Box } from '@mui/material';

const ShowsLodgings = async () => {



  const params = new URLSearchParams([['email_user', 'gmovia@fi.uba.ar']]);

  const data = await axios.post('/fetchAllUserProperties/', {},{ params });
  console.log(data.data)


}

export default ShowsLodgings
