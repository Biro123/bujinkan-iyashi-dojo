import React from 'react';
import { withRouter } from 'react-router-dom';
import routes from './routes';
import { useSidebarState } from '../../globalState/sidebarState';
import { useUserState } from '../../globalState/userState';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloseIcon from '@material-ui/icons/CloseRounded';
import {
  IconButton,
  Drawer,
  MenuList,
  MenuItem,
  ListItemText,
  Grid
 } from '@material-ui/core';
 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
}));

const SideBar = (props) => {
  const classes = useStyles();
  const isOpen = useSidebarState();
  const userState = useUserState();

  const activeRoute = (routeName) => {
    return props.location.pathname === routeName ? true : false;
  }

  const routeList = routes(userState.isAuthenticated);

  const menuItems = routeList.map((menuItem, index) => {
    if (!menuItem.disabled) {
      return (
        <ListItem button key={index} disabled={menuItem.disabled}
          onClick={() => props.history.push(menuItem.path)}>
          <MenuItem selected={activeRoute(menuItem.path)}>
            <ListItemIcon>
               {React.createElement(menuItem.icon)}                        
            </ListItemIcon>
            <ListItemText primary={menuItem.sidebarName} />
          </MenuItem>
        </ListItem>
      );
    } 
  });

  return (
    <div>
      <Drawer className={classes.drawer}
        open={isOpen.get()} 
        onClose={() => isOpen.setClosed()}
      >
        <div
          className={classes.fullList}
          role="presentation"
          onClick={() => isOpen.setClosed()}
          onKeyDown={() => isOpen.setClosed()}
        >
          <ListItem button
             onClick={() => isOpen.setClosed}>
            <Grid container justify="flex-end">
              <IconButton edge="end" aria-label="close">
                <CloseIcon />  
              </IconButton>
            </Grid>        
          </ListItem>
          <Divider/>
          <MenuList>
            {menuItems}
          </MenuList>
        </div>
      </Drawer>
    </div>
  );
};

export default withRouter(SideBar);