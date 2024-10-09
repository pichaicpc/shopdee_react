import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Link from '@mui/material/Link';

import MenuButton from './MenuButton';
import MenuContent from './MenuContent';

const empID = localStorage.getItem('empID');
const firstName = localStorage.getItem('firstName');
const lastName = localStorage.getItem('lastName');
const imageFile = localStorage.getItem('imageFile');
const url = process.env.REACT_APP_BASE_URL;

function SideMenuMobile({ open, toggleDrawer }) {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/admin/login';
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Link href={`/admin/employee/view/${empID}`} underline='none'>
              <Avatar              
                sizes="small"
                alt={firstName + ' ' + lastName}
                src={`${url}/employee/image/${imageFile}`}
                sx={{ width: 24, height: 24 }}
              />
            </Link>
            <Typography component="p" variant="h6">
              {firstName + ' ' + lastName}
            </Typography>
          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>        
        <Stack sx={{ p: 2 }}>
          <Button variant="outlined" 
            fullWidth 
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}>
            ออกจากระบบ
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
