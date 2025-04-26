import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

export default function SignUpPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogin = async(provider , formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    try{
      const res = await axios.post('http://localhost:5000' , {
        email,
        password,
      });
      alert(res.data.message);
      navigate('/hello')
    } catch(err) {
      alert(err.response?.data?.message || 'Sign Up Error');
    }
  }
  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={handleLogin}
        slotProps={{
          emailField: { variant: 'standard', autoFocus: false },
          passwordField: { variant: 'standard' },
          submitButton: { variant: 'outlined' },
          rememberMe: {
            control: (
              <Checkbox
                name="tandc"
                value="true"
                color="primary"
                sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
              />
            ),
            color: 'textSecondary',
            label: 'I agree with the T&C',
          },
        }}
        providers={providers}
      />
    </AppProvider>
  );
}
