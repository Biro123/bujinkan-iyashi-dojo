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
    minWidth: 275,
    marginBottom: 12,
    textAlign: 'left'
  },
  postedBy: {
    textAlign: 'right',
  },
  pos: {
    marginBottom: 12,
  },
});

const LinkDisplay = ({ link, playerHeight }) => {
  if (link.includes('www.youtube.com')) {
    return (
      <ReactPlayer 
        url={link} 
        width='100%'
        height={playerHeight}
        // height='calc(320 / 1.778)'
      />
    );  
  }
  return (
    <Link href={link} color="secondary">
      {link}
    </Link> 
  );
};

const Post = (props) => {
  const [ playerHeight, setPlayerHeight ] = useState(240);
  const thisRef = createRef(null);
  const classes = useStyles();
  const { text, link, tags, date, name } = props;

  useEffect(() => {
    // console.log('width', thisRef.current ? thisRef.current.offsetWidth : 0);
    const newHeight = thisRef.current ? 
      (thisRef.current.offsetWidth -34)/1.77778 
      : 240;
    // console.log('height: ' + newHeight);  
    setPlayerHeight(newHeight);
  },[thisRef.current]); 
  
  return (
    <Card className={classes.root} ref={thisRef} variant="outlined">
      <CardContent>            
        <Typography variant='body2' >
          {text}
        </Typography>
        <LinkDisplay link={link} playerHeight={playerHeight} />
        <Tags
          label="Categories:"
          value={[]}
          // setValue={handleTagClick}
          options={tags.map((tag, index) => { 
            return { label: tag.tag, value: index }                
          })}
        />
        <Typography variant='subtitle2' color='textSecondary' className={classes.postedBy} >
          {'Posed by: ' + name + ' on ' + new Date(date).toDateString()}
        </Typography>          
      </CardContent>
    </Card>
  )
}
export default Post;