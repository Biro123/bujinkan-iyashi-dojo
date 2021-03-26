import { useState } from '@hookstate/core';
import axios from 'axios';
import Userfront from '@userfront/react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Tags from './Tags';

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
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PostForm(props) {

  const emptyForm = {
    title: '',
    text: '',
    link: '',
    tags: [],
  };

  const classes = useStyles();  
  const alertState = useAlertState();
  const userState = useUserState();
  const open = useState(false);
  const formData = useState(emptyForm);
  const tagValue = useState([]);

	const tagOptions = [
    {label: "Philosophy", value: 1}, 
    {label: "Basics", value: 2}, 
    {label: "Kamae", value: 3},
    {label: "Kihon Happo", value: 4}
  ];

  const handleTagClick = (data) => {
    tagValue.set(data);

    const selectedTagNames = tagOptions
      .filter((option) => data.indexOf(option.value) !== -1)
      .map((option) => option.label);
      
    formData.tags.set(selectedTagNames);
  };

  const handleClickOpen = () => {
    open.set(true);
  };

  const handleClose = () => {
    open.set(false);
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
      // props.onNewData(res.data);
      formData.set(emptyForm);
      handleClose();
    } catch (err) {      
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
    if (title === '') {
      alertState.setAlert('Please enter a title', 'error');
    } else {
      postData(formData.get());
    }
  };

  if (!open.get()) {
    return (
      <Button
        // type="submit"
        // fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={handleClickOpen}
      >
        New Post
      </Button>
    )  
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
    <Dialog open={open.get()} onClose={handleClose} aria-labelledby="form-dialog-title">
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