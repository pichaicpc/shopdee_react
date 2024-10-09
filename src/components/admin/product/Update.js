import { React, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import axios from "axios";
import AppNavbar from '../components/AppNavbar';
import SideMenu from '../components/SideMenu';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Link from '@mui/material/Link';

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

export default function Update() {
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [typeID, setTypeID] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Fetch the current product data when the component is mounted      
    axios.get(`${url}/product/${id}`,
      {
        headers: {
        'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        const product = response.data;        
        setProductName(product.productName); 
        setProductDetail(product.productDetail); 
        setPrice(product.price); 
        setCost(product.cost); 
        setQuantity(product.quantity); 
        setImageFile(product.imageFile); 
        setTypeID(product.typeID);          
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDetail', productDetail);
    formData.append('price', price);
    formData.append('cost', cost);
    formData.append('quantity', quantity);
    formData.append('typeID', typeID);

    if (imageFile) {
      formData.append('imageFile', imageFile); // Append image file if it exists
    }

    const response = await axios.put(`${url}/product/${id}`, formData,
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
        window.location.href = '/admin/product';
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
        id="product_update" 
        name="product_update"
        component="main" maxWidth="lg">        
        <CssBaseline />            
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ marginTop: '16px'}}
            separator={<NavigateNextRoundedIcon fontSize="small" />}
            >            
            <Link href="/admin/product"
            sx={{ color: 'text.primary'}}
            underline="hover"            
            >
              ข้อมูลสินค้า
            </Link>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            แก้ไข
            </Typography>
        </Breadcrumbs>

        <Container maxWidth="xs" sx={{alignContent: 'center'}}> 
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="ชื่่อสินค้า"
                  id="productName"
                  name="productName"
                  autoComplete="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="รายละเอียดสินค้า"
                  id="productDetail"
                  name="productDetail"
                  autoComplete="productDetail"
                  value={productDetail}
                  onChange={(e) => setProductDetail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="ราคา"
                  id="price"
                  name="price"
                  autoComplete="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="ต้นทุน"
                  id="cost"
                  name="cost"
                  autoComplete="cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="จำนวน"
                  id="quantity"
                  name="quantity"
                  autoComplete="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="ประเภทสินค้า"
                  id="typeID"
                  name="typeID"
                  autoComplete="typeID"
                  value={typeID}
                  onChange={(e) => setTypeID(e.target.value)}
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