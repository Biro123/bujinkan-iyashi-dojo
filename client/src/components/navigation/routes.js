import AccountBoxIcon from '@material-ui/icons/AccountBoxRounded';
// import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HomeIcon from '@material-ui/icons/HomeRounded';
import PostsIcon from '@material-ui/icons/ListAltRounded';

import Members from '../content/Members';
import { PasswordReset, SignUp, SignIn } from '../auth/userfrontAuth'
import SignOut from '../auth/SignOut';
import Home from '../content/Home';

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
      path: '/posts',
      sidebarName: 'Posts',
      // disabled: !isAuthenticated,
      disabled: false,
      icon: PostsIcon,
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