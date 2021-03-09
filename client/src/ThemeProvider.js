import { MuiThemeProvider } from '@material-ui/core';
import { getThemeByName } from './themes/base';
import { useThemeState } from './globalState/themeState';


const ThemeProvider = (props) => {
  const themeState = useThemeState();  
  const theme = getThemeByName(themeState.get());

  return (    
    <MuiThemeProvider theme={theme}>
      {props.children}
    </MuiThemeProvider>
  )
}
export default ThemeProvider;