import { useState } from '@hookstate/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

import DataForm from './DataForm';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
  },
  content: {
    padding: '1rem 1.5rem 1.5rem',
  },
  pos: {
    marginBottom: 12,
  },
});

const Data = () => {
  const classes = useStyles();
  const state = useState(axios.get('/api/data'));

  if (state.promised) {
    return <p>Loading...</p>
  }
  if (state.error) {
    console.error(state.error);
    return <p>Error...</p>
  }

  const { data, status } = state.get();

  const handleNewData = (newEntry) => {
    state.data.set(data => [...data, newEntry]);
  }
  
  return (
    <>
      {data.map((entry, index) =>
        <Card key={index} className={classes.root}>
          <CardContent>
            <Typography variant='body1' >
              {entry.text}
            </Typography>            
          </CardContent>
        </Card>
        // <p key={index}>{entry.text}</p>
      )}
      <DataForm onNewData={handleNewData}/>
    </>
  )
}
export default Data;