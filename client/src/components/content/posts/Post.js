import { useEffect, createRef, useState } from 'react';
import ReactPlayer from "react-player";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Tags, { tagOptions } from './Tags';

import { useUserState } from '../../../globalState/userState';

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
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const Post = (props) => {
  const [playerHeight, setPlayerHeight] = useState(240);
  const [anchorEl, setAnchorEl] = useState(null);
  const userState = useUserState();
  const thisRef = createRef(null);
  const classes = useStyles();
  const { title, text, link, tags, date, name, user } = props.post;

  useEffect(() => {
    // console.log('width', thisRef.current ? thisRef.current.offsetWidth : 0);
    const newHeight = thisRef.current ? 
      (thisRef.current.offsetWidth -34)/1.77778 
      : 240;
    // console.log('height: ' + newHeight);  
    setPlayerHeight(newHeight);
  },[thisRef.current]); 

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    setAnchorEl(null);
  };

  const handleEditClick = (event) => {
    props.onEdit(props.post);    
    setAnchorEl(null);
  };

  const handleDeleteClick = (event) => {
    props.onDelete(props.post);
    setAnchorEl(null);
  };

  const canUpdatePost = () => {
    if (!userState.user) {
      return false
    }
    return (userState.user.userUuid && userState.user.userUuid === user) ||
            userState.roles.includes('admin');
  };

  const contentDisplay = () => {
    if (link.includes('www.youtube.com')) {
      return (
        <>
          <ReactPlayer 
            url={link} 
            width='100%'
            // controls
            height={playerHeight}
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
        <Typography variant='h6' className={classes.header} >
          {title}
          {canUpdatePost() &&          
          <IconButton
            aria-label="open edit menu" 
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
          }
          <Menu
            id="edit-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          </Menu>
        </Typography>        
        
        {contentDisplay()}
        <Tags
          // label="Categories:"
          value={tagOptions.map((tag) => tag.value)} // highlight all
          // setValue={handleTagClick}
          options={tags.map((tag, index) => { 
            return { label: tag.tag, value: index + 1 }                
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