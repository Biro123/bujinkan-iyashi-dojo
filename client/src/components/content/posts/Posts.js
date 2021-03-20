import { useState } from '@hookstate/core';
import Userfront from '@userfront/react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

import DataForm from '../DataForm';
import PostForm from './PostForm';
import Post from './Post';
import Tags from './Tags';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 12,
    textAlign: 'left'
  },
  title: {
    fontSize: 14,
  },
  postedBy: {
    textAlign: 'right',
  },
  pos: {
    marginBottom: 12,
  },
});

const Posts = ({tag}) => {
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
        <Post {...post} key={index}/>
        // <Card key={index} className={classes.root} variant="outlined">
        //   <CardContent>            
        //     <Typography variant='body2' >
        //       {post.text}
        //     </Typography>
        //     <Link href={post.link} color="secondary">
        //       {post.link}
        //     </Link> 
        //     <Tags
        //       label="Categories:"
        //       value={[]}
        //       // setValue={handleTagClick}
        //       options={post.tags.map((tag, index) => { 
        //         return { label: tag.tag, value: index }                
        //       })}
        //     />
        //     <Typography variant='subtitle2' color='textSecondary' className={classes.postedBy} >
        //       {'Posed by: ' + post.name + ' on ' + new Date(post.date).toDateString()}
        //     </Typography>          
        //   </CardContent>
        // </Card>
        // <p key={index}>{entry.text}</p>
      )}
      {/* <DataForm onNewData={handleNewData}/> */}
    </>
  )
}
export default Posts;