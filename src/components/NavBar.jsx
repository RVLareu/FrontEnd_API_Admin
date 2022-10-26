import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Home from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background:'#e67e22'}}>
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HospedateAhora
          </Typography>

        <Button>
            <Link style={{ textDecoration: 'none' }} to="/showsPublications">
                    Publicaciones
            </Link>
        </Button>

        <Button>
            <Link style={{ textDecoration: 'none' }} to="/profile">
                    Perfil
            </Link>
        </Button>
            <IconButton>
                    <Home/>
            </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
