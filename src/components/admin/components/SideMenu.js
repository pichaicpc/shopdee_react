import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';

const drawerWidth = 240;
const empID = localStorage.getItem('empID');
const firstName = localStorage.getItem('firstName');
const lastName = localStorage.getItem('lastName');
const email = localStorage.getItem('email');
const imageFile = localStorage.getItem('imageFile');
const url = process.env.REACT_APP_BASE_URL;


const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    window.location.href = '/admin/employee/view/' + empID;
  };


  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/admin/login';
  };

  return (    
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >                  
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>

        <Link href="#" underline='none'>
          <Avatar
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}               
            sizes="small"
            alt={firstName + ' ' + lastName}
            src={`${url}/employee/image/${imageFile}`}
            sx={{ width: 36, height: 36 }}
          />
        </Link>
             
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleProfile}>โปรไฟล์</MenuItem>            
            <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
          </Menu>
        </div>

        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {firstName + ' ' + lastName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {email}
          </Typography>
        </Box>       
      </Stack>

      {/* Start Menu Content */}
      <MenuContent />
      {/* End Menu Content */}


    </Drawer>    
  );
}
