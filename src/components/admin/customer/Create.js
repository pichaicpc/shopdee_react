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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const token = localStorage.getItem('token');
const url = process.env.REACT_APP_BASE_URL;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Create() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  
  
  const handleSubmit = async (e) => {
      e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('birthdate', birthdate);
    formData.append('address', address);
    formData.append('homePhone', homePhone);
    formData.append('mobilePhone', mobilePhone);

    if (imageFile) {
      formData.append('imageFile', imageFile); // Append image file if it exists
    }

    const response = await axios.post(url+'/customer', formData, 
      {
        headers: {              
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      }
    );

    const result = response.data;      
    alert(result['message']);

    if(result['status'] === true){            
        window.location.href = '/admin/customer';
    }
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected file
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />   

      <Container 
        id="customer_create" 
        name="customer_create"
        component="main" maxWidth="lg">        
        <CssBaseline />            
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ marginTop: '16px'}}
            separator={<NavigateNextRoundedIcon fontSize="small" />}
            >            
            <Link href="/admin/customer"
            sx={{ color: 'text.primary'}}
            underline="hover"            
            >
              ข้อมูลลูกค้า
            </Link>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            เพิ่ม
            </Typography>
        </Breadcrumbs>

        <Container maxWidth="xs" sx={{alignContent: 'center'}}>        
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="อีเมล"                  
                  autoComplete="email"
                  value={email}
                  onChange={ (e) => setEmail(e.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="birthdate"
                  name="birthdate"
                  label="วันเกิด (yyyy-dd-mm)"                  
                  autoComplete="birthdate"
                  value={birthdate}
                  onChange={ (e) => setBirthdate(e.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField                  
                  fullWidth
                  id="address"
                  name="address"
                  label="ที่อยู่"                  
                  autoComplete="address"
                  value={address}
                  onChange={ (e) => setAddress(e.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField                  
                  fullWidth
                  id="homePhone"
                  name="homePhone"
                  label="โทรศัพท์บ้าน"                  
                  autoComplete="homePhone"
                  value={homePhone}
                  onChange={ (e) => setHomePhone(e.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField                  
                  fullWidth
                  id="mobilePhone"
                  name="mobilePhone"
                  label="โทรศัพท์เคลื่อนที่"                  
                  autoComplete="mobilePhone"
                  value={mobilePhone}
                  onChange={ (e) => setMobilePhone(e.target.value) }
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">เพศ</FormLabel> {/* Gender label */}
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)} // Handle gender change
                  row
                >
                  <FormControlLabel value="0" control={<Radio />} label="ชาย" />
                  <FormControlLabel value="1" control={<Radio />} label="หญิง" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="contained"
                  required
                  startIcon={<CloudUploadIcon />}
                >
                  รูปภาพสินค้า
                  <VisuallyHiddenInput
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    onChange={handleImageChange} // Use the image change handler
                  />
                </Button>
                {imageFile && <Typography>{imageFile.name}</Typography>} {/* Display selected image name */}
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