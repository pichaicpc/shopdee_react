import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CategoryIcon from '@mui/icons-material/Category';
import ExtensionIcon from '@mui/icons-material/Extension';

const positionID = localStorage.getItem('positionID');

export default function MenuContent() {
  const path = window.location.pathname.split('/'); 
  const page = path[path.length - 1]; 

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
          <ListItem key="1"  disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={page === 'admin'} href="/admin">
              <ListItemIcon><DashboardIcon/></ListItemIcon>
              <ListItemText primary='แดชบอร์ด' />
            </ListItemButton>
          </ListItem>

          <ListItem key="2"  disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={page === 'order'} href="/admin/order">
              <ListItemIcon><ShoppingCartIcon/></ListItemIcon>
              <ListItemText primary='รายการสั่งซื้อ' />
            </ListItemButton>
          </ListItem>
          <ListItem key="3"  disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={page === 'customer'} href="/admin/customer">
              <ListItemIcon><GroupsIcon/></ListItemIcon>
              <ListItemText primary='ลูกค้า' />
            </ListItemButton>
          </ListItem>

          {positionID === '1' ? (
            <ListItem key="4" disablePadding sx={{ display: 'block' }}>
              <ListItemButton selected={page === 'employee'} href="/admin/employee">
                <ListItemIcon><Diversity3Icon/></ListItemIcon>
                <ListItemText primary='พนักงาน' />
              </ListItemButton>
            </ListItem>
          ) : null}

          <ListItem key="5"  disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={page === 'producttype'} href="/admin/producttype">
              <ListItemIcon><CategoryIcon/></ListItemIcon>
              <ListItemText primary='ประเภทสินค้า' />
            </ListItemButton>
          </ListItem>
          
          <ListItem key="6"  disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={page === 'product'} href="/admin/product">
              <ListItemIcon><ExtensionIcon/></ListItemIcon>
              <ListItemText primary='สินค้า' />
            </ListItemButton>
          </ListItem>
      </List>
    </Stack>
  );
}
