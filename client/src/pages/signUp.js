import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'; // Added for making HTTP requests

export default function SignUp() {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    allowExtraEmails: false,
  });

  // Function to handle form field changes
  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'allowExtraEmails' ? checked : value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send POST request to backend API for user registration
      const response = await axios.post('http://localhost:7003/api/signup', formData);
      console.log(response.data); // Log response from backend
      // Reset form fields
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        allowExtraEmails: false,
      });
      // Redirect to login page or display success message
    } catch (error) {
      console.error('Error:', error); // Log any errors
      // Handle error response from backend (e.g., display error message)
    }
  };

  return (
    <Container
      component="main"
      
      sx={{
         // Set minimum height to 100% viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundImage: `url('https://wallpapers.com/images/hd/cloud-storage-dark-blue-aesthetic-qengx5mvwsc23mww.jpg')`,
       
        
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
          backgroundColor: 'white', // Add a background color if needed
          opacity: 0.9,
        }}
      >
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form style={{ width: '100%', marginTop: '8px' }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                  checked={formData.allowExtraEmails}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '24px 0 16px' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/loginPage" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          {/* Add additional content if needed */}
        </Box>
      </div>
    </Container>
  );
}
