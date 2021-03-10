import AccountBoxIcon from '@material-ui/icons/AccountBoxRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HomeIcon from '@material-ui/icons/HomeRounded';

import Members from '../content/Members';
import { PasswordReset, SignUp, SignIn } from '../auth/userfrontAuth'
// import SignIn from '../auth/SignIn';
// import SignUp from '../auth/SignUp';
import SignOut from '../auth/SignOut';
import Home from '../content/Home';
import BreakpointGrid from '../layout/BreakpointGrid';

const routes = (isAuthenticated) => {
  return  [
    {
      path: '/home',
      sidebarName: 'Home',
      disabled: false,
      icon: HomeIcon,
      component: Home
    },
    {
      path: '/layout',
      sidebarName: 'Layout',
      disabled: false,
      icon: AccountCircleIcon,
      component: BreakpointGrid
    },
    {
      path: '/members',
      sidebarName: 'Members',
      disabled: false,
      icon: AccountCircleIcon,
      component: Members
    },
    {
      path: '/register',
      sidebarName: 'Sign Up',
      disabled: isAuthenticated,
      icon: AccountBoxIcon,
      component: SignUp
    },
    {
      path: '/login',
      sidebarName: 'Sign In',
      disabled: isAuthenticated,
      icon: LockOutlinedIcon,
      component: SignIn
    },
    {
      path: '/logout',
      sidebarName: 'Sign Out',
      disabled: !isAuthenticated,
      icon: LockOutlinedIcon,
      component: SignOut
    },
    {
      path: '/reset',
      sidebarName: 'Password Reset',
      disabled: false,
      icon: LockOutlinedIcon,
      component: PasswordReset
    },    
  ];
}

export default routes;