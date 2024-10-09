import { React, useEffect, useState } from "react";
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
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';

import AppNavbar from '../components/AppNavbar';
import SideMenu from '../components/SideMenu';

const defaultTheme = createTheme();
const token = localStorage.getItem('token');
const url = process.env.REACT_APP_BASE_URL;

// Main component for rendering the user list
export default function Index() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // default rows per page

  useEffect(() => {
    UsersGet();
  }, []);

  // Fetch users from the API
  const UsersGet = () => {
    axios.get(`${url}/employee`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUsers(response.data);  // Update the state with the new list of employees
        setFilteredUsers(response.data); // Set initially filtered users to the whole list
      })
      .catch((error) => {
        console.error('Error fetching users', error);
      });
  };

  // Function to filter users based on the search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(users.filter((user) =>
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
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

  // Function to view a user's details
  const ViewUser = (id) => {
    window.location = `/admin/employee/view/${id}`;
  };

  // Function to handle user update
  const UpdateUser = (id) => {
    window.location = `/admin/employee/update/${id}`;
  };

  // Function to delete a user
  const DeleteUser = (id) => {
    axios.delete(`${url}/employee/${id}`, {
      headers: {
        'Accept': 'application/form-data',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.status === true) {
          alert(response.data.message);
          UsersGet(); // Fetch the updated list after deletion
        } else {
          alert('Failed to delete user');
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  // Function to sort users
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
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
      id="employee_index"
      name="employee_index"
      sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />

      {/* Start Main content */}
      <Container sx={{ marginTop: 2 }} maxWidth="lg">
        <Paper sx={{ padding: 2, color: 'text.secondary' }}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                รายการข้อมูลพนักงาน
              </Typography>
            </Box>
          </Box>

          {/* Search Bar */}
          <Box display="flex" alignItems="center" mb={2}>
            <Box flexGrow={1} mr={2}>
              <Link to="/admin/employee/create">
                <Button
                  id="btnCreate"
                  name="btnCreate"
                  variant="contained"
                  sx={{ backgroundColor: 'success.light' }}
                >
                  เพิ่มข้อมูลพนักงาน
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
                placeholder="ค้นหาด้วยชื่อ, นามสกุล, ชื่อผู้ใช้"
                sx={{ width: '260px' }} 
              />
            </Box>
          </Box>


          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" onClick={() => handleSort('empID')}><strong>รหัส</strong></TableCell>
                  <TableCell align="center"><strong>รูปภาพ</strong></TableCell>
                  <TableCell align="left" onClick={() => handleSort('firstName')}><strong>ชื่อ</strong></TableCell>
                  <TableCell align="left" onClick={() => handleSort('lastName')}><strong>นามสกุล</strong></TableCell>
                  <TableCell align="left" onClick={() => handleSort('username')}><strong>ชื่อผู้ใช้</strong></TableCell>
                  <TableCell align="center"><strong>จัดการข้อมูล</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination logic
                  .map((user) => (
                    <TableRow key={user.empID}>
                      <TableCell align="right">{user.empID}</TableCell>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center">
                          <Avatar src={url + '/employee/image/' + user.imageFile} />
                        </Box>
                      </TableCell>
                      <TableCell align="left">{user.firstName}</TableCell>
                      <TableCell align="left">{user.lastName}</TableCell>
                      <TableCell align="left">{user.username}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                          <Button 
                            id="btnView"
                            name="btnView" 
                            onClick={() => ViewUser(user.empID)}
                            sx={{backgroundColor: 'info.light',color: 'white'}}
                          >
                            แสดง
                          </Button>
                          <Button 
                            id="btnUpdate"
                            name="btnUpdate" 
                            onClick={() => UpdateUser(user.empID)}
                            sx={{backgroundColor: 'warning.light', color: 'white'}}
                          >
                              แก้ไข
                          </Button>
                          <Button 
                            id="btnDelete"
                            name="btnDelete" 
                            onClick={() => DeleteUser(user.empID)}
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
            count={filteredUsers.length}
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
