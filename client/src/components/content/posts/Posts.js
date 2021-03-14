import { useState } from '@hookstate/core';
import Userfront from '@userfront/react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

import DataForm from '../DataForm';
import PostForm from './PostForm';

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

const Posts = ({tag}) => {
  console.log('in posts');
  const classes = useStyles();
  const config = {
    headers: { 
      // 'Content-Type': 'application/json',
      // 'x-uf-idToken': Userfront.idToken(),
      Authorization: `Bearer ${Userfront.accessToken()}`,
    }
  };

  const postState = useState(axios.get('/api/posts', config));

  if (postState.promised) {
    return <p>Loading...</p>
  }
  if (postState.error) {
    console.error(postState.error);
    return <p>Error...</p>
  }

  const { data, status } = postState.get();

  const handleNewData = (newEntry) => {
    postState.data.set(data => [...data, newEntry]);
  }

  if (data.length === 0) {    
    return (
      <>
        <PostForm />
        <p>No data found</p>
      </>
    )
  }
  
  return (
    <>
      <PostForm />
      {data.map((post, index) =>
        <Card key={index} className={classes.root}>
          <CardContent>
            <Typography variant='body1' >
              {post.text}
            </Typography>            
          </CardContent>
        </Card>
        // <p key={index}>{entry.text}</p>
      )}
      {/* <DataForm onNewData={handleNewData}/> */}
    </>
  )
}
export default Posts;