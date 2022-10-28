import * as React from 'react';
import Button from '@mui/material/Button';
import { Route, useNavigate, BrowserRouter, BrowserRouter as Router, Redirect, Switch} from "react-router-dom";


export default function GoBack() {
  const navigate = useNavigate();
  return (
      <button onClick={() => navigate(-1)} title="Volver" > Volver </button>
  );
}

