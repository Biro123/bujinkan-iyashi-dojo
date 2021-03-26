import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Posts from './posts/Posts';
import PostForm from './posts/PostForm';

const Members = () => {

  return (
    <Container component="main" >
      <Grid container spacing={2}>
        <Grid item xs={12} s={12} m={12}>
          {/* <Typography variant="h4" color="primary" >
            Header goes here
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            And some subtext here
          </Typography> */}
          <PostForm />
        </Grid>        
        <Posts tag='Kamae'/>
      </Grid>
    </Container>
  )
}
export default Members;