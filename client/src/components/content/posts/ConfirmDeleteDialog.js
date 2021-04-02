import axios from 'axios';
import Userfront from '@userfront/react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  button: {
    margin: theme.spacing(1, 0, 1),
  },
}));

export default function ConfirmDeleteDialog(props) {

  const classes = useStyles();  
  const alertState = useAlertState();

  const handleDelete = async () => {   
    const config = {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Userfront.accessToken()}`,
      }
    };
    try {
      const res = await axios.delete('/api/posts/' + props.post._id, config);
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

  return (
    <Dialog open onClose={props.onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Confirm Delete</DialogTitle>
      <DialogContent>        
        <Typography variant="body1" gutterBottom>
          Delete post titled: <b>{props.post.title}</b> ?
        </Typography>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            fullWidth
            variant="contained"
            className={classes.button}
            onClick={props.onClose}
          >
            Cancel
          </Button>   
      </DialogContent>
    </Dialog>
  );
}