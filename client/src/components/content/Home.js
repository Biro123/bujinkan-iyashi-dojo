import { useUserState } from '../../globalState/userState';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import logo from '../../img/iyashi_logo.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '12px'
  },
  paper: {
    padding: 20,
    textAlign: "left",
    // color: theme.palette.text.secondary,
    // fontFamily: "Roboto"
  },
  logo: {
    display: 'flex',
    justifyContent: 'center', /* horizontally center */
    alignItems: 'center',    /* vertically center */
    height: '100%'
  }
}));

const Home = () => {
  const classes = useStyles();
  const userState = useUserState();

  const userData = userState.user || {};  
  const userDataString = JSON.stringify(userData, null, 2);

  return (
    <div className={classes.root}>
      {/* <h2>About</h2> */}
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
          <div className={classes.logo}>
            <img src={logo} alt="Logo" width='300' height='300' />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>          
          <Paper className={classes.paper}>
            <h2>Bujinkan</h2>            
            <p>
              The Bujinkan (Japanese: 武神館) is an international martial arts 
              organization based in Japan and headed by Masaaki Hatsumi. 
              The combat system taught by this organization comprises nine separate ryūha, 
              or schools, which are collectively referred to as Bujinkan Budō Taijutsu. 
              Masaaki Hatsumi uses the term Budo (meaning martial way) as the ryūha are descended 
              from historical samurai schools that teach samurai martial tactics and 
              ninjutsu schools that teach ninja tactics.
            </p>            
          </Paper>
        </Grid>        
        <Grid item xs={12} sm={6}>          
          <Paper className={classes.paper}>         
            <h2>Iyashi Dojo</h2>   
            The Iyashi Dojo is a small dojo based in Hartlepool. 
            Headed by two extremely experienced shidōshi. The main website can be found at: 
            <Link href='http://www.bujinkaniyashidojo.com' color='secondary'> 
              <span> http://www.bujinkaniyashidojo.com/</span>
            </Link>
          </Paper>
        </Grid>
      </Grid>
      {/* <pre>User: {userData.name}</pre> */}
    </div>
  );
}
export default Home;