import React from 'react';
import { Link } from "react-router-dom";
import data from '../data/dataProperties';
import Card from "../components/Card"
import Tarjetas from "../components/Tarjetas"





const ShowsLodgings = () => {
    const cards = data.map(item => {

        return (
          <Card
            key={item.id}
            {...item}
          />
        )
      })
    
      return (
        <div>
         
            {cards}
    
          
        </div>
      )
}

export default ShowsLodgings
