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
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [typeName, setTypeName] = useState("");  

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
        setTypeName(product.typeName);      
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);  

  // Function to handle user update
  const UpdateProduct = (id) => {
    window.location = `/admin/product/update/${id}`;
  }
 

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />    
      <Container 
        id="product_view" 
        name="product_view"
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
            แสดงรายละเอียด
            </Typography>
        </Breadcrumbs>      
             
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Card>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <Avatar sx={{ width: 100, height: 100 }}
                            src={url + '/product/image/' + imageFile}/>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h5" gutterBottom>
                                {productName}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                {productDetail}
                            </Typography>
                            <Typography color="textSecondary">
                                ราคา : {price}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="body1" gutterBottom>
                        ต้นทุน : {cost}
                    </Typography>                    
                    <Typography variant="body1" gutterBottom>
                        จำนวน : {quantity}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        ประเภทสินค้า : {typeName}
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Button variant="contained" color="primary"
                      onClick={() => UpdateProduct(id)}>
                        แก้ไขข้อมูลสินค้า
                    </Button>                    
                </CardContent>
            </Card>
        </Container>
      </Container>
    </Box>
  );
}