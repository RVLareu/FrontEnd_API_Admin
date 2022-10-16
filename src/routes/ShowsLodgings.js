import React from 'react';
import { Link } from "react-router-dom";
import data from '../data/dataProperties';
import Card from "../components/Card"
import { Box } from '@mui/material';



const ShowsLodgings = () => {
      return (
        <>
          <Box sx={{display:'flex',flexWrap: 'wrap' }}>
              {data.map(item => {
                return (
                    <Card key={item.id} {...item}/>
                )}
              )}   
          </Box>
        </>
      )
}

export default ShowsLodgings
