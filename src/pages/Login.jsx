import { useNavigate } from "react-router-dom"
import api from "../api/api"

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '../assets/login.css'
import { Container } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E5E0D8',
    },
    secondary: {
      main: '#725C3A',
    },
    error: {
      main: '#F44336',
    },
    success: {
      main: '#4CAF50',
    }
  },
})

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://linker-p40s.onrender.com/">
        Linker
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const container = 'true'

export const Login = ({setToken}) => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");
      
      const tokenData = await api.login(email, password);
      setToken(tokenData.token)
      navigate('/home');
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const container="true"


  return (
    <ThemeProvider theme={theme}>
        <Grid className='login' container component="main" maxWidth="xs" sx={{ height: '100vh'}}>
          <CssBaseline />
          <Container spacing={3} noValidate sx={{ mt: 1 }}>
          <Grid
          sx={{
            backdropFilter: "blur(10px)",
            borderRadius: 5,
            marginTop: 10,
            color: 'primary.light',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box className='loginSlogan' mb={5} sx={{
            marginTop: 4,
            display: 'flex',
            color: 'primary.light',
            justifyContent: 'center',
          }}>
            <Typography className="loginTypo1" component="h1" variant="h3" sx={{ 
              fontFamily: 'slogan',
              display: { xs: 'none', md:'flex'}
              }}>
              Discover.
            </Typography>
            <Typography component="h1" variant="h3" sx={{
              color: 'primary.light',
              fontFamily: 'slogan',
              zIndex: 'center'
              }}>
              Connect.
            </Typography>
            <Typography className="loginTypo1" component="h1" variant="h3" sx={{
              color: 'primary.light',
              fontFamily: 'slogan',
              display: { xs: 'none', md:'flex' }
            }}>
              Grow.
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate 
            sx={{ mt: 1,
              borderRadius: 2
            }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              className='textField'
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className='textField'
            />
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, 
                bgcolor: 'secondary.light',
                color: 'primary.light'
              }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-start">
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item xs>
                <Link href="/register" variant="body1" sx={{
                  color: 'primary.light'
                }}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Box>
        </Grid>
          </Container>
        </Grid>
    </ThemeProvider>
  );
}