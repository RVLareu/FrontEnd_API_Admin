import React, {useState} from 'react';
import './App.css';

import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
import Home from './routes/Home';
import Layout from './components/Layout';
import Casero from './routes/Casero';
import Missing from './routes/Missing';
import Unauthorized from './routes/Unauthorized';
import LinkPage from './routes/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import CargaPropiedad from './components/CargaPropiedad';
import ShowsLodgings from './routes/ShowsLodgings';
import UpdateData from './components/UpdateData';
import NavBar from './components/NavBar';



const ROLES = {
  'Inquilino': 2001,
  'Casero': 1984,
  'Admin': 5150
}


function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false)

  return (
    <>
    <NavBar/>
    <Routes>
    <Route path="/" element={<Layout />}>
      {/* public routes */}
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="/" element={<Home />} />
      <Route path="linkpage" element={<LinkPage />} />
      <Route path="casero" element={<Casero />} />
      <Route path="cargaPropiedad" element={<CargaPropiedad />} />
      <Route path="showLodgings" element={< ShowsLodgings/>} />
      <Route path="updateData/:id" element={<UpdateData/>} />
      <Route path="unauthorized" element={<Unauthorized />} />
      
      
      {/*
      <Route element={<RequireAuth allowedRoles={[ROLES.Inquilino]} />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Casero]} />}>
        <Route path="editor" element={<Editor />} />
      </Route>


      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="admin" element={<Admin />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Casero, ROLES.Admin]} />}>
        <Route path="lounge" element={<Lounge />} />
      </Route> */}

      
      <Route path="*" element={<Missing />} /> 
    </Route>
  </Routes>
  </>
);
   
  
}

export default App;
