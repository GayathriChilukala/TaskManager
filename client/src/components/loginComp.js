import * as React from 'react';
import { useState } from 'react'; // Import useState for managing state
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // Import axios for HTTP requests
import { setEmail } from '../actions/userActions';
import { useRouter } from 'next/router';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const LoginAct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmailA] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error message

  const handleLogin = async () => {
    try {
      // Make a POST request to the backend to verify login credentials
      const response = await axios.post('http://localhost:7036/api/login', {
        email: email,
        password: password,
      });

      // If login is successful, redirect to the dashboard page
      if (response.status === 200) {
        dispatch(setEmail(email));
        // window.location.href = '/dashboardPage';
        router.push('/dashboardPage');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle login error, display error message
      setError('Invalid email or password');
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <main
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/6804077/pexels-photo-6804077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 300,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            borderRadius: 4,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            opacity: 0.9,
          }}
        >
          <div>
            <Typography variant="h4" component="h1">
              <b>Welcome To Task Manager!</b>
            </Typography>
            <Typography variant="body2">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmailA(e.target.value)} // Update email state on change
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
            />
          </FormControl>
          <Button variant="contained" sx={{ mt: 1 }} onClick={handleLogin}>
            Log in
          </Button>
          {error && (
            <Typography variant="body2" align="center" color="error">
              {error}
            </Typography>
          )}
          <Typography variant="body2" align="center">
            Don&apos;t have an account? <Link href="/signUp">Sign up</Link>
          </Typography>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default LoginAct;
