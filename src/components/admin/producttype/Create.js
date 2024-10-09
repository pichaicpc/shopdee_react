import {React, useState} from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import AppNavbar from '../components/AppNavbar';
import SideMenu from '../components/SideMenu';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Link from '@mui/material/Link';


const url = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('token');


export default function Create() {
  const [typeName, setTypeName] = useState("");


  const handleSubmit = async (e) => {
      e.preventDefault();

      const response = await axios.post(url + '/producttype',
        {                       
          typeName            
        },
        {
          headers: {              
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const result = response.data;      
      alert(result['message']);

      if(result['status'] === true){            
          window.location.href = '/admin/producttype';
      }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />   

      <Container 
        id="producttype_create" 
        name="producttype_create"
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
            เพิ่ม
            </Typography>
        </Breadcrumbs>

        <Container maxWidth="xs" sx={{alignContent: 'center'}}>    
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>         
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="typeName"                  
                  name="typeName"
                  label="ประเภทสินค้า"
                  autoComplete="typeName"
                  value={typeName}
                  onChange={ (e) => setTypeName(e.target.value) }
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
        </Container> 

      </Container>
    </Box>  
  );
}