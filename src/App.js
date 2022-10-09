import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Layout from './components/Layout';
import Inquilino from './components/Inquilino';
import Casero from './components/Casero';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';



const ROLES = {
  'Inquilino': 2001,
  'Casero': 1984,
  'Admin': 5150
}


function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false)

  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      {/* public routes */}
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="/" element={<Home />} />
      <Route path="linkpage" element={<LinkPage />} />
      <Route path="inquilino" element={<Inquilino />} />
      <Route path="casero" element={<Casero />} />
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
);
   
  
}

export default App;
