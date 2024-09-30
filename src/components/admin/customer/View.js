import { React, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import axios from "axios";
import AppNavbar from '../components/AppNavbar';
import SideMenu from '../components/SideMenu';


const defaultTheme = createTheme();
const token = localStorage.getItem('token');
const url = process.env.REACT_APP_BASE_URL;

export default function View() {  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");    
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [address, setAddress] = useState("");
  const [homePhone, setHomePhone] = useState("");
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
        setFirstName(customer.firstName);
        setLastName(customer.lastName);   
        setEmail(customer.email);
        setGender(customer.gender);
        setImageFile(customer.imageFile);
        setAddress(customer.address);
        setHomePhone(customer.homePhone);        
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  }, [id]);  

  // Function to handle user update
  const UpdateUser = (id) => {
    window.location = `/admin/customer/update/${id}`;
  }  
  return (
    <ThemeProvider theme={defaultTheme}>
        <SideMenu />
        <AppNavbar />       
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Card>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <Avatar sx={{ width: 100, height: 100 }}
                            src={url + '/customer/image/' + imageFile}/>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h5" gutterBottom>
                                {firstName} {lastName}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                {email}
                            </Typography>
                            <Typography color="textSecondary">
                                เพศ : {gender === 0 ? "ชาย" : gender === 1 ? "หญิง" : "-"}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="body1" gutterBottom>
                        ที่อยู่ : {address ? address : 'No address provided'}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        เบอร์โทร : {homePhone ? homePhone : 'No phone number provided'}
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Button variant="contained" color="primary"
                      onClick={() => UpdateUser(id)}>
                        แก้ไขบัญชีผู้ใช้
                    </Button>                    
                </CardContent>
            </Card>
        </Container>
    </ThemeProvider>
  );
}