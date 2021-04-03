import { useEffect } from 'react';
import './App.css';
import Userfront from '@userfront/react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppNavBar from './components/appNavBar/AppNavBar';
import AlertMessage from './components/alert/AlertMessage';
import { useUserState } from './globalState/userState';
import ThemeProvider from './ThemeProvider';
import SideBar from './components/navigation/SideBar';
import routes from './components/navigation/routes';

const App = () => {

  Userfront.init(process.env.REACT_APP_UF_INIT);
  const userState = useUserState();

  //Base URL for every request
  // axios.defaults.baseURL = "https://codespot.org";
  //Base authentication token
  // axios.defaults.headers.common['x-auth-token'] = userState.token;
  
  useEffect(() => {
    // check for token in LS
    if (Userfront.accessToken()) {
      userState.loadUser();
    }    

    // log user out from all tabs if they log out in one tab
    // window.addEventListener('storage', () => {
    //   if (!localStorage.token) userState.signOut();
    // });
  }, []);
 
  return (
    <div className="App">
      <Router>
        <ThemeProvider>
          <CssBaseline />
          <AppNavBar />
          <AlertMessage />
          <SideBar />
          <div style={{ paddingTop: '1em' }}>
            <Switch>            
              {routes().map((route) => (
                <Route exact path={route.path} key={route.path}>
                  <route.component />
                </Route>
              ))}
              <Route path= '/'>
                <Redirect to='/home' />
              </Route>    
            </Switch>
          </div>          
        </ThemeProvider>        
      </Router>      
    </div>
  );
}

export default App;
