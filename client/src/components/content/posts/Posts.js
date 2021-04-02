import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Post from './Post';

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

const Posts = ({ tags, onEdit, isLoading, posts }) => {
  const classes = useStyles();

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (posts.status !== 200) {
    console.error(posts.error);
    return <p>Error...</p>
  }

  // const handleNewPost = (newEntry) => {
  //   posts.set(post => [...post, newEntry]);
  // }

  if (posts.data.length === 0) {    
    return (
      <>
        <p>No data found</p>
      </>
    )
  }
  
  return (
    <>
      {posts.data.map((post, index) => {
        if (post.tags.some(postTag => tags.includes(postTag.tag))) {
          return (
            <Grid  key={index} item xs={12} sm={6} md={4}>
              <Post post={post} onEdit={onEdit}/>  
            </Grid>     
          )
        }         
      })}
    </>
  )
}
export default Posts;