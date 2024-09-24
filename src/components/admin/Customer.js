import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";
import axios from 'axios';

// Fetch token from local storage
const token = localStorage.getItem('token');
const url = process.env.REACT_APP_BASE_URL;

// Define a custom theme using createTheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize your primary color here
    },
  },
  spacing: 8, // Default spacing
});



// Main component for rendering the user list
function Customer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UsersGet(setUsers);
  }, []); // No need to add UsersGet as a dependency

  const UsersGet = async (setUsers) => {
    try {
      const response = await axios.get("http://10.13.4.47:4000/api/customer", {
        headers: {
          'Accept': 'application/form-data',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  // Function to handle user update
  const UpdateUser = id => {
    window.location = `/update/${id}`;
  }

  // Function to delete a user
  const UserDelete = id => {
    axios.delete(`${url}/customer/${id}`, {
      headers: {
        'Accept': 'application/form-data',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      alert(response.data.message);
      if (response.data.status === true) {
        UsersGet();
      }
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: theme.spacing(2) }} maxWidth="lg">    
        <Paper sx={{ padding: theme.spacing(2), color: 'text.secondary' }}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                รายการข้อมูลลูกค้า
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  เพิ่มข้อมูลลูกค้า
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">รหัส</TableCell>
                  <TableCell align="center">รูป</TableCell>
                  <TableCell align="left">ชื่อ</TableCell>
                  <TableCell align="left">นามสกุล</TableCell>
                  <TableCell align="left">ชื่อผู้ใช้</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.custID}>
                    <TableCell align="right">{user.custID}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center">
                        <Avatar src={url + '/customer/image/' + user.imageFile} />
                      </Box>
                    </TableCell>
                    <TableCell align="left">{user.firstName}</TableCell>
                    <TableCell align="left">{user.lastName}</TableCell>
                    <TableCell align="left">{user.username}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button onClick={() => UpdateUser(user.custID)}>Edit</Button>
                        <Button onClick={() => UserDelete(user.custID)}>Del</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
export default Customer;
