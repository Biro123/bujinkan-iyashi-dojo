import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Data from './Data';
import Posts from './posts/Posts';

const Members = () => {

  return (
    <Container component="main" maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary" >
            Header goes here
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            And some subtext here
          </Typography>
          <Posts tag='Kamae'/>
          {/* <Data /> */}
        </Grid>
      </Grid>
    </Container>
  )
}
export default Members;