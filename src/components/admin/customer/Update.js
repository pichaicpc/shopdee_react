import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import AppNavbar from '../components/AppNavbar';
import SideMenu from '../components/SideMenu';


const defaultTheme = createTheme();
const token = localStorage.getItem('token');
const url = process.env.REACT_APP_BASE_URL;

export default function Update() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Fetch the current customer data when the component is mounted      
    axios.get(`${url}/profile/${id}`,
      {
        headers: {
        'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        const customer = response.data;
        setUsername(customer.username);
        setFirstName(customer.firstName);
        setLastName(customer.lastName);        
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  }, [id]);


  const handleSubmit = async (e) => {
      e.preventDefault();

      const response = await axios.put(`${url}/customer/${id}`,
          {                       
            username,
            password,
            firstName,
            lastName
          },
          {
            headers: {              
              'Authorization': `Bearer ${token}`
            }
          }
      );

      const result = response.data;
      console.log(result);
      alert(result['message']);

      if(result['status'] === true){            
          window.location.href = '/admin/customer';
      }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <SideMenu />
      <AppNavbar />            
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            แก้ไขข้อมูลลูกค้า
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="ชื่อ"
                  value={firstName}
                  onChange={ (e) => setFirstName(e.target.value) }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="นามสกุล"
                  name="lastName"
                  value={lastName}
                  onChange={ (e) => setLastName(e.target.value) }
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="ชื่อผู้ใช้"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={ (e) => setUsername(e.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="รหัสผ่าน"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={ (e) => setPassword(e.target.value) }
                />
              </Grid>
            </Grid>
            <Button
              id="btnCreate"
              name="btnCreate"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              บันทึกข้อมูล
            </Button>
          </Box>
        </Box>        
      </Container>
    </ThemeProvider>
  );
}