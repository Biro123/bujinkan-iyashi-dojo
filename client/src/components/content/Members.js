import { useState } from '@hookstate/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Posts from './posts/Posts';
import PostForm from './posts/PostForm';
import Tags, { tagOptions } from './posts/Tags';

const Members = () => {

  const tagValue = useState([]);

  const handleTagClick = (data) => {
    // console.log(data);
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
        <Grid item xs={12} s={12} m={12}>
          {/* <Typography variant="h4" color="primary" >
            Header goes here
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            And some subtext here
          </Typography> */}
          <Tags 
            label="Categories:"
            value={tagValue.get()}
            setValue={handleTagClick}
            options={tagOptions}
            allowClick
          />
          <PostForm />
        </Grid>        
        <Posts tags={extractTagNames()}/>
      </Grid>
    </Container>
  )
}
export default Members;