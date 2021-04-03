import { useState, useEffect } from 'react';
import axios from 'axios';
import Userfront from '@userfront/react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Posts from './posts/Posts';
import PostForm from './posts/PostForm';
import ConfirmDeleteDialog from './posts/ConfirmDeleteDialog';
import Tags, { tagOptions } from './posts/Tags';

import { useUserState } from '../../globalState/userState';

const useStyles = makeStyles((theme) => ({
  newButton: {
    margin: theme.spacing(1, 0, 1),
  }
}));

const Members = () => {
  const [tagValue, setTagValue] = useState(tagOptions.map((tag) => tag.value));
  const [renderForm, setRenderForm] = useState({ display: false, post: null });
  const [renderDeleteDialog, setRenderDeleteDialog] = useState({ display: false, post: null });
  const classes = useStyles();
  const [postState, setPostState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userState = useUserState();

  const config = {
    headers: { 
      Authorization: `Bearer ${Userfront.accessToken()}`,
    }
  };

  const fetchData = async () => {
    const res = await axios.get('/api/posts', config);
    setPostState(res);
    setIsLoading(false);
  };

  useEffect(() => {    
    fetchData();
  },[]);

  const handleTagClick = (data) => {
    setTagValue(data);    
  };

  const handleFormOpen = (post) => {
    if(post) {
      setRenderForm({ display: true, post: post });
    } else {
      setRenderForm({ display: true, post: null });
    }    
  };

  const handleFormClose = (shouldReload) => {
    setRenderForm({ display: false, post: null });
    shouldReload && fetchData();
  };

  const handleDialogOpen = (post) => {
    setRenderDeleteDialog({ display: true, post: post });
  };

  const handleDialogClose = (shouldReload) => {
    setRenderDeleteDialog({ display: false, post: null });
    shouldReload && fetchData();
  };

  const extractTagNames = () => {
    return tagOptions
      .filter((option) => tagValue.indexOf(option.value) !== -1)
      .map((option) => option.label);
  }      

  return (
    <Container component="main" >
      {renderForm.display && 
        <PostForm onClose={handleFormClose} post={renderForm.post}/> 
      }    
      {renderDeleteDialog.display && 
        <ConfirmDeleteDialog onClose={handleDialogClose} post={renderDeleteDialog.post}/> 
      }   
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
            value={tagValue}
            setValue={handleTagClick}
            options={tagOptions}
            allowClick
          />
        </Grid>
        {userState.user &&
          <Grid item xs={12} sm={2} md={2}>
            <Button 
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.newButton}
              onClick={() => handleFormOpen()}
            >
              New
            </Button>      
          </Grid>
        }
        <Posts 
          tags={extractTagNames()} 
          onEdit={handleFormOpen} 
          onDelete={handleDialogOpen}
          posts={postState}
          isLoading={isLoading}/>
      </Grid>
    </Container>
  )
}
export default Members;