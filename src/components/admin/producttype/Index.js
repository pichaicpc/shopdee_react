import {React, useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";
import axios from 'axios';
import AppNavbar from '../components/AppNavbar';
import SideMenu from '../components/SideMenu';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';

const defaultTheme = createTheme();
const url = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('token');

// Main component for rendering the type list
export default function Index() {
  const [types, setTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // default rows per page

  useEffect(() => {
    TypesGet(setTypes);
  }, []);

  // Function to fetch types from the API
  const TypesGet = () => {
    axios.get(`${url}/producttype`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
       // Update the state with the new list of product typs
      setTypes(response.data); 
      setFilteredTypes(response.data);
    })
    .catch((error) => {
      console.error('Error fetching types', error);
    });
  };

  // Function to filter types based on the search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredTypes(types.filter((type) =>
      type.typeName.toLowerCase().includes(query)      
    ));
  };
  
  // Function to handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };

  // Function to view a type's details
  const ViewType = (id) => {
    window.location = `/admin/producttype/view/${id}`;
  }

  // Function to handle type update
  const UpdateType = (id) => {
    window.location = `/admin/producttype/update/${id}`;
  }

  // Function to delete a type
  const DeleteType = (id) => {
    axios.delete(`${url}/producttype/${id}`, {
      headers: {
        'Accept': 'application/form-data',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.data.status === true) {
        alert(response.data.message);
        TypesGet(); // Fetch the updated list after deletion
      } else {
        alert('Failed to delete type');
      }
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
  };

  // Function to sort types
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTypes = filteredTypes.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (    
    <ThemeProvider theme={defaultTheme}>
      <Box 
        id="producttype_index"
        name="producttype_index"
        sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />        

          {/* Start Main content */}
          <Container sx={{ marginTop: 2 }} maxWidth="lg">    
            <Paper sx={{ padding: 2, color: 'text.secondary' }}>               
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    รายการข้อมูลประเภทสินค้า
                  </Typography>
                </Box>
              </Box>

              {/* Search Bar */}
              <Box display="flex" alignItems="center" mb={2}>
                <Box flexGrow={1} mr={2}>
                  <Link to="/admin/producttype/create">
                    <Button
                      id="btnCreate"
                      name="btnCreate"
                      variant="contained"
                      sx={{ backgroundColor: 'success.light' }}
                    >
                      เพิ่มข้อมูลประเภทสินค้า
                    </Button>
                  </Link>
                </Box>            
                <Box>
                  <TextField
                    id="search"
                    name="search"
                    label="ค้นหา"
                    variant="outlined"
                    size="small"                             
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="ค้นหาด้วยชื่อประเภทสินค้า"
                    sx={{ width: '260px' }} 
                  />
                </Box>
              </Box>

              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right" onClick={() => handleSort('typeID')}><strong>รหัส</strong></TableCell>
                      <TableCell align="left" onClick={() => handleSort('typeName')}><strong>ชื่อประเภทสินค้า</strong></TableCell>
                      <TableCell align="center"><strong>จัดการข้อมูล</strong></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {sortedTypes
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination logic
                    .map((type) => (
                      <TableRow key={type.typeID}>
                        <TableCell align="right">{type.typeID}</TableCell>                        
                        <TableCell align="left">{type.typeName}</TableCell>
                        <TableCell align="center">
                          <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button 
                              id="btnView"
                              name="btnView" 
                              onClick={() => ViewType(type.typeID)}
                              sx={{backgroundColor: 'info.light',color: 'white'}}
                            >
                              แสดง
                            </Button>
                            <Button 
                              id="btnUpdate"
                              name="btnUpdate" 
                              onClick={() => UpdateType(type.typeID)}
                              sx={{backgroundColor: 'warning.light', color: 'white'}}
                            >
                                แก้ไข
                            </Button>
                            <Button 
                              id="btnDelete"
                              name="btnDelete" 
                              onClick={() => DeleteType(type.typeID)}
                              sx={{backgroundColor: 'error.light', color: 'white'}}
                            >
                                &nbsp;ลบ&nbsp;
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <TablePagination
                component="div"
                count={filteredTypes.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />              
            </Paper>
          </Container>
          {/* End Main content */}    
      </Box>
    </ThemeProvider>  
  );  
}