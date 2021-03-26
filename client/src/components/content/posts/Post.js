import { useEffect, createRef, useState } from 'react';
import ReactPlayer from "react-player";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Tags from './Tags';

const useStyles = makeStyles({
  root: {
    minWidth: 248,
    maxWidth: 360,
    marginBottom: 12,
    textAlign: 'left'
  },
  postedBy: {
    textAlign: 'none',
  },
  pos: {
    marginBottom: 12,
  },
});

const Post = (props) => {
  const [ playerHeight, setPlayerHeight ] = useState(240);
  const thisRef = createRef(null);
  const classes = useStyles();
  const { title, text, link, tags, date, name } = props;

  useEffect(() => {
    // console.log('width', thisRef.current ? thisRef.current.offsetWidth : 0);
    const newHeight = thisRef.current ? 
      (thisRef.current.offsetWidth -34)/1.77778 
      : 240;
    // console.log('height: ' + newHeight);  
    setPlayerHeight(newHeight);
  },[thisRef.current]); 

  const contentDisplay = () => {
    if (link.includes('www.youtube.com')) {
      return (
        <>
          <ReactPlayer 
            url={link} 
            width='100%'
            controls
            height={playerHeight}
            // height='calc(320 / 1.778)'
          />
          <Typography variant='body2' >
            {text}
          </Typography>
        </>
      );  
    }
    return (
      <>
        <Typography variant='body2' >
            {text}
        </Typography>
        <div style={{ height: `${playerHeight}px`, wordWrap: 'break-word', paddingTop: '12px' }}>
          <Link href={link} color="secondary" >
            {link}
          </Link> 
        </div>    
      </>
    );
  };

  return (    
    <Card className={classes.root} ref={thisRef} variant="outlined">
      <CardContent style={{ padding: '0' }}>   
        <Typography variant='h6' >
          {title}
        </Typography>        
        {contentDisplay()}
        <Tags
          // label="Categories:"
          value={[]}
          // setValue={handleTagClick}
          options={tags.map((tag, index) => { 
            return { label: tag.tag, value: index }                
          })}
        />
        <Typography variant='caption' color='secondary' className={classes.postedBy} >
          {'Posted by: ' + name + ' on ' + new Date(date).toDateString()}
        </Typography>          
      </CardContent>
    </Card>
  )
}
export default Post;