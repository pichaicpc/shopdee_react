import { React, useState, useEffect } from "react";
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

const url = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('token');


export default function View() {  
  const [typeName, setTypeName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Fetch the current product type data when the component is mounted      
    console.log(token);
    axios.get(`${url}/producttype/${id}`,
      {
        headers: {
        'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        const producttype = response.data;        
        setTypeName(producttype.typeName);      
      })
      .catch(error => {
        console.error('Error fetching product type data:', error);
      });
  }, [id]);  

  // Function to handle user update
  const UpdateUser = (id) => {
    window.location = `/admin/producttype/update/${id}`;
  }  
  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />    
      <Container 
        id="producttype_view" 
        name="producttype_view"
        component="main" maxWidth="lg">        
        <CssBaseline />            
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ marginTop: '16px'}}
            separator={<NavigateNextRoundedIcon fontSize="small" />}
            >            
            <Link href="/admin/producttype"
            sx={{ color: 'text.primary'}}
            underline="hover"            
            >
              ข้อมูลประเภทสินค้า
            </Link>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            แสดงรายละเอียด
            </Typography>
        </Breadcrumbs>      

        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Card>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h5" gutterBottom>
                                {typeName}
                            </Typography>
                        </Grid>
                    </Grid>                    
                    <Divider sx={{ marginY: 2 }} />
                    <Button variant="contained" color="primary"
                      onClick={() => UpdateUser(id)}>
                        แก้ไขข้อมูลประเภทสินค้า
                    </Button>                    
                </CardContent>
            </Card>
        </Container>
      </Container>
    </Box>
  );
}