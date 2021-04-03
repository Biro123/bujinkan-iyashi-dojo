import { useState } from '@hookstate/core';
import axios from 'axios';
import Userfront from '@userfront/react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Tags, { tagOptions } from './Tags';
import AlertMessage from '../../alert/AlertMessage';

import { useUserState } from '../../../globalState/userState';
import { useAlertState } from '../../../globalState/alertState';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(3),
  },
  textfield: {
    marginBottom: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

const setTagIndexFromNames = (tagList) => {
  const tagNames =  tagList.map(tag => tag.tag);
  return tagOptions
    .filter((option) => tagNames.includes(option.label))
    .map(option => option.value);
};

export default function PostForm(props) {

  const emptyForm = {    
    title: '',
    text: '',
    link: '',
    tags: [],
  };

  const initialForm = props.post ? props.post : emptyForm;

  const classes = useStyles();  
  const alertState = useAlertState();
  const userState = useUserState();
  const formData = useState(initialForm);
  const tagValue = useState(setTagIndexFromNames(initialForm.tags));

  const handleTagClick = (data) => {
    tagValue.set(data);

    const selectedTagNames = tagOptions
      .filter((option) => data.indexOf(option.value) !== -1)
      .map((option) => {return { tag: option.label }});
      
    formData.tags.set(selectedTagNames);
  };  

  const postData = async () => {   
    const config = {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Userfront.accessToken()}`,
      }
    };
    const body = JSON.stringify(formData.get());
    try {
      const res = await axios.post('/api/posts', body, config);
      formData.set(emptyForm);
      props.onClose(true);
    } catch (err) { 
      console.log(err);     
      if (err.response) {
        // Server responded with a status in the 2xx range
        const errors = err.response.data ? err.response.data.errors : null;      
        if (errors) {
          errors.forEach(error => alertState.setAlert(error.msg, 'error'));
        } else {
          alertState.setAlert(err.response.statusText, 'error');
          formData.text.set('');
        }
      } else if (err.request) {
        // No response was received
        console.log(err.request);
        alertState.setAlert('Unexpected error', 'error');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message);
      }
    }
  };  

  const putData = async () => {   
    const config = {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Userfront.accessToken()}`,
      }
    };
    const body = JSON.stringify(formData.get());
    try {
      const res = await axios.put('/api/posts/' + formData._id.get(), body, config);
      // props.onNewData(res.data);
      formData.set(emptyForm);
      props.onClose(true);
    } catch (err) { 
      console.log(err);     
      if (err.response) {
        // Server responded with a status in the 2xx range
        const errors = err.response.data ? err.response.data.errors : null;      
        if (errors) {
          errors.forEach(error => alertState.setAlert(error.msg, 'error'));
        } else {
          alertState.setAlert(err.response.statusText, 'error');
          formData.text.set('');
        }
      } else if (err.request) {
        // No response was received
        console.log(err.request);
        alertState.setAlert('Unexpected error', 'error');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message);
      }
    }
  };

  const { title, text, link } = formData.get();

  const onChange = (e) =>
    formData[e.target.name].set(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();    
    if (formData.title === '') {
      alertState.setAlert('Please enter a title', 'error');
      return;  
    }
    if (formData.tags.length === 0) {
      alertState.setAlert('Please select at least one tag', 'error');
      return;  
    } 
    
    if (formData._id.get()) {
      putData();
    } else {
      postData();
    }
  };

  if (!userState.isAuthenticated) {
    return (
      <Typography variant='body1' color='secondary'>
          Log in to add items
      </Typography>
    )    
  }

  if (!userState.user.confirmedAt) {
    return (
      <Typography variant='body1' color='secondary'>
          Verify your account to add items
      </Typography>
    )    
  }

  return (
    <Dialog open onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Link</DialogTitle>
      <DialogContent>        
        <form className={classes.form} noValidate  onSubmit={(e) => onSubmit(e)}>
        <TextField
            className={classes.textfield} 
            name="title"
            variant="outlined"
            required
            fullWidth
            id="title"
            label="Enter Title"
            autoFocus
            value={title}
            onChange={(e) => onChange(e)}
          />
          <Tags
            label="Tags"
            allowClick
            value={tagValue.get()}
            setValue={handleTagClick}
            options={tagOptions}
          />
          <TextField
            className={classes.textfield} 
            name="text"
            variant="outlined"
            fullWidth
            id="text"
            label="Enter Text"
            multiline
            rows={2}
            value={text}
            onChange={(e) => onChange(e)}
          />
          <TextField
            className={classes.textfield} 
            name="link"
            variant="outlined"
            fullWidth
            id="link"
            label="Optional Link"
            value={link}
            onChange={(e) => onChange(e)}
          />   
          <AlertMessage />             
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Submit
          </Button>   
        </form>
      </DialogContent>
    </Dialog>
  );
}