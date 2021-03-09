import { useState } from '@hookstate/core';
import axios from 'axios';
import Userfront from '@userfront/react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useUserState } from '../../globalState/userState';
import { useAlertState } from '../../globalState/alertState';


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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function DataForm(props) {
  const classes = useStyles();  
  const alertState = useAlertState();
  const userState = useUserState();
  const formData = useState({
    text: ''
  });

  const postData = async () => { 
  
    const config = {
      headers: { 
        'Content-Type': 'application/json',
        'x-uf-idToken': Userfront.idToken(),
        Authorization: `Bearer ${Userfront.accessToken()}`,
      }
    };

    const body = JSON.stringify(formData.get());
    try {
      const res = await axios.post('/api/data', body, config);
      props.onNewData(res.data);
      formData.set({text: ''});
    } catch (err) {      
      const errors = err.response.data ? err.response.data.errors : null;      
      if (errors) {
        errors.forEach(error => alertState.setAlert(error.msg, 'error'));
      } else {
        alertState.setAlert(err.response.statusText, 'error');
        formData.text.set('');
      }
    }
  };  

  const { text } = formData.get();

  const onChange = (e) =>
    formData[e.target.name].set(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();    
    if (text === '') {
      alertState.setAlert('Please enter some text', 'error');
    } else {
      postData(formData.get());
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
    <div className={classes.paper}>
      <form className={classes.form} noValidate  onSubmit={(e) => onSubmit(e)}>
        <TextField
          name="text"
          variant="outlined"
          required
          fullWidth
          id="text"
          label="Enter Text"
          autoFocus
          value={text}
          onChange={(e) => onChange(e)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add
        </Button>          
      </form>
    </div>
  );
}