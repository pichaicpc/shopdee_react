import { React, useState, useEffect } from "react";
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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const token = localStorage.getItem('token');
const url = process.env.REACT_APP_BASE_URL;


export default function View() {  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");    
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [positionName, setPositionName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Fetch the current employee data when the component is mounted      
    console.log(token);
    axios.get(`${url}/employee/${id}`,
      {
        headers: {
        'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        const employee = response.data;        
        setFirstName(employee.firstName);
        setLastName(employee.lastName);   
        setEmail(employee.email);
        setGender(employee.gender);
        setImageFile(employee.imageFile);
        setMobilePhone(employee.mobilePhone);
        setPositionName(employee.positionName);        
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, [id]);  

  // Function to handle user update
  const UpdateUser = (id) => {
    window.location = `/admin/employee/update/${id}`;
  }  
  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />    
      <Container 
        id="employee_view" 
        name="employee_view"
        component="main" maxWidth="lg">        
        <CssBaseline />            
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ marginTop: '16px'}}
            separator={<NavigateNextRoundedIcon fontSize="small" />}
            >            
            <Link href="/admin/employee"
            sx={{ color: 'text.primary'}}
            underline="hover"            
            >
              ข้อมูลพนักงาน
            </Link>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            รายละเอียด
            </Typography>
        </Breadcrumbs>       
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Card>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <Avatar sx={{ width: 100, height: 100 }}
                            src={url + '/employee/image/' + imageFile}/>
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
                       ตำแหน่ง : {positionName ? positionName : '-'}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                       เบอร์โทร : {mobilePhone ? mobilePhone : '-'}
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Button variant="contained" color="primary"
                      onClick={() => UpdateUser(id)}>
                        แก้ไขบัญชีผู้ใช้
                    </Button>                    
                </CardContent>
            </Card>
        </Container>
      </Container>        
    </Box>
  );
}