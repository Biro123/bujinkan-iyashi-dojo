import { useState } from '@hookstate/core';
import Userfront from '@userfront/react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import Post from './Post';
import Tags from './Tags';

const useStyles = makeStyles({
  // root: {
  //   minWidth: 275,
  //   marginBottom: 12,
  //   textAlign: 'left'
  // },
  // title: {
  //   fontSize: 14,
  // },
  // postedBy: {
  //   textAlign: 'right',
  // },
  // pos: {
  //   marginBottom: 12,
  // },
});

const Posts = ({ tags }) => {
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
        <p>No data found</p>
      </>
    )
  }
  
  return (
    <>
      {data.map((post, index) => {
        if (post.tags.some(postTag => tags.includes(postTag.tag))) {
          return (
            <Grid  key={index} item xs={12} sm={6} md={4}>
              <Post {...post}/>  
            </Grid>     
          )
        }         
      })}
    </>
  )
}
export default Posts;