import { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import green from "@material-ui/core/colors/green";
import Switch from '@material-ui/core/Switch';

import { useUserState } from '../../globalState/userState';
import { useThemeState } from '../../globalState/themeState';
import { useSidebarState } from '../../globalState/sidebarState';

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  customColor: {
    // or hex code, this is normal CSS background-color
    backgroundColor: green[500]
  },
  customHeight: {
    minHeight: 200
  },
  offset: theme.mixins.toolbar
}));

export default function AppNavBar() {
  const classes = useStyles();

  const userState = useUserState();
  const sideBarState = useSidebarState();
  const themeState = useThemeState();

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => sideBarState.toggle()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Title
          </Typography>
          <Switch
            onChange={themeState.toggle}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
}
