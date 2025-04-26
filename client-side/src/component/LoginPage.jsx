import React from 'react'
import {
    Button,
    FormControl,
    FormControlLabel,
    Checkbox,
    InputLabel,
    OutlinedInput,
    TextField,
    InputAdornment,
    Link,
    Alert,
    IconButton,
    useTheme
} from '@mui/material'

import AccountCircle from '@mui/icons-material/AccountCircle'
import {Visibility, VisibilityOff, visibilityOff} from '@mui/icons-material'
import {AppProvider} from '@toolpad/core/AppProvider';
import {SignInPage} from '@toolpad/core/SignInPage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const providers = [{id: 'credentials' , name: 'Email and Password'}];

function CustomEmailField() {
    return(
        <TextField 
            id='input-with-icon-textfield'
            label='Email'
            name='email'
            type='email'
            size='small'
            required
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start' >
                    <AccountCircle fontSize='inherit' />
                  </InputAdornment>
                )
              }
            }}
            variant='outlined'
        />
    );
}

function CustomPasswordField() {
  const [show , setShow] = React.useState(false);

  const handleClickShowPassword = () => setShow((s) => !s);

  const handleMouse = (event) => {
    event.preventDefault();
  };

  return(
    <FormControl sx={{my: 2}} fullWidth variant='outlined'>
      <InputLabel>
        Password
      </InputLabel>
      <OutlinedInput
        id='outlined-adornment-password'
        type={show ? 'text' : 'password'}
        name='password'
        size='small'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton 
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouse}
              edge='end'
              size='large'
            >
              {show ? (
                <VisibilityOff fontSize='inherit' />
              ): (<Visibility fontSize='inherit' />)
            }
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        />
    </FormControl>
  );
}

function LoginButton(){
  return(
    <Button type='submit' variant='outlined' color='info' sx={{display: 'flex' , justifyContent: 'center'}} >
      Login
    </Button>
  )
}

function SignUpButton(){
  return(
    <Link href='/register' variant='body2' >
      Sign Up
    </Link>
  )
}

function Title(){
  return(
    <h2 style={{marginBottom: 5}} >Login</h2>
  )
}

function Subtitle() {
  return(
    <Alert sx={{mb: 2 , px: 1 , py: 0.25}} severity='warning' >
        We are invetigating an on going outage
    </Alert>
  );
}

function Agree() {
  return(
    <FormControlLabel 
      control={
        <Checkbox 
          name='tandc'
          value='true'
          color='primary'
          sx={{padding: 0.5}} 
        />
      }
      slotProps={{
        typography: {
          fontSize: 14,
        },
      }}
      color='textSecondary'
      label="I agree with the T and C"
    />
  );
}

const LoginPage = () => {

  const handleLogin = async (provider , formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    try{
      const res = await axios.post('http://localhost:5000/login', {
        email, password
      });

      alert(res.data.message);
      navigate('/hello')
    } catch(err) {
      alert(err.response?.data?.message || 'Login Error')
    }

  };

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppProvider theme={theme}>
        <SignInPage 
          signIn={handleLogin}
          slots={{
            title: Title,
            subtitle: Subtitle,
            emailField: CustomEmailField,
            passwordField: CustomPasswordField,
            submitButton: LoginButton,
            signUpLink: SignUpButton,
            rememberMe: Agree
          }}
          providers={providers}
        />
    </AppProvider>
  )
}

export default LoginPage