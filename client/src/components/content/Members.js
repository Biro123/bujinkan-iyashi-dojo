import { useState } from '@hookstate/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Posts from './posts/Posts';
import PostForm from './posts/PostForm';
import Tags, { tagOptions } from './posts/Tags';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const Members = () => {
  const tagValue = useState(tagOptions.map((tag) => tag.value));
  const classes = useStyles();

  const handleTagClick = (data) => {
    tagValue.set(data);    
  };

  const extractTagNames = () => {
    return tagOptions
      .filter((option) => tagValue.get().indexOf(option.value) !== -1)
      .map((option) => option.label);
  }      

  return (
    <Container component="main" >
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
            <PostForm />
          </Grid>
        <Posts tags={extractTagNames()}/>
      </Grid>
    </Container>
  )
}
export default Members;