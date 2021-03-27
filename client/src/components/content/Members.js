import { useState } from '@hookstate/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Posts from './posts/Posts';
import PostForm from './posts/PostForm';
import Tags, { tagOptions } from './posts/Tags';

const useStyles = makeStyles((theme) => ({
  newButton: {
    margin: theme.spacing(1, 0, 1),
  }
}));

const Members = () => {
  const tagValue = useState(tagOptions.map((tag) => tag.value));
  const renderForm = useState(false);
  const classes = useStyles();

  const handleTagClick = (data) => {
    tagValue.set(data);    
  };

  const handleClickOpen = () => {
    renderForm.set(true);
  };

  const handleFormClose = () => {
    renderForm.set(false);
  };

  const extractTagNames = () => {
    return tagOptions
      .filter((option) => tagValue.get().indexOf(option.value) !== -1)
      .map((option) => option.label);
  }      

  return (
    <Container component="main" >
      {renderForm.get() && <PostForm onClose={handleFormClose}/> }    
      <Grid container spacing={2}>
          {/* <Typography variant="h4" color="primary" >
            Header goes here
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            And some subtext here
          </Typography> */}
        <Grid item xs={12} sm={10} md={10} >
          <Tags 
            label="Tags:"
            value={tagValue.get()}
            setValue={handleTagClick}
            options={tagOptions}
            allowClick
          />
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Button 
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.newButton}
            onClick={handleClickOpen}
          >
            New
          </Button>      
        </Grid>
        <Posts tags={extractTagNames()}/>
      </Grid>
    </Container>
  )
}
export default Members;