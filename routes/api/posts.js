const express = require('express');
const router = express.Router();
const axios = require('axios');
const { check, validationResult } = require('express-validator');
const ufAuth = require('../../middleware/ufAuth');

const Post = require('../../models/Post');
const checkObjectId = require('../../middleware/checkObjectId');

async function getUser(userId) {

  const config = {
    headers: { 
      Authorization: `Bearer ${process.env.USERFRONT_API_KEY}`,
    }
  };

  try {
    const response = await axios.get('https://api.userfront.com/v0/users/' + userId, config);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  ufAuth,
  check('title', 'Title is required').notEmpty(),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Read logged-in user details from userfront api
    const apiRes = await getUser(req.auth.userId);
    if (!apiRes) {
      return res.status(500).json({ errors: [{ msg: 'Unable to connect to auth service' }] });
    }
    const user = apiRes.data;

    // Create new post
    try {
      const newTags = req.body.tags.map(tag => {
        return { tag: tag.tag }
      });
      if (newTags.length === 0) {
        newTags.push({ tag: 'None' });
      }

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        link: req.body.link,
        tags: newTags,
        name: user.name,
        avatar: user.image,
        user: req.auth.userUuid
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/posts/:id
// @desc     Update a post
// @access   Private
router.put(
  '/:id',
  ufAuth,
  checkObjectId('id'),
  check('title', 'Title is required').notEmpty(),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }    

    // Read logged-in user details from userfront api
    const apiRes = await getUser(req.auth.userId);
    if (!apiRes) {
      return res.status(500).json({ errors: [{ msg: 'Unable to connect to auth service' }] });
    }
    const user = apiRes.data;

    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      // Only allow the post creater or an admin to update
      const tenantId = req.auth.tenantId;
      const roles = req.auth.authorization[tenantId].roles;
      if (post.user !== req.auth.userUuid && !roles.includes('admin')) {
        return res.status(401).json({ errors: [{ msg: 'User not Authorised' }] });
      }

      // exclude id, so just provide new list of tagnames
      const updatedTags = req.body.tags.map(tag => {
        return { tag: tag.tag }
      });
      if (updatedTags.length === 0) {
        updatedTags.push({ tag: 'None' });
      }

      post.title = req.body.title;
      post.text = req.body.text;
      post.link = req.body.link;
      post.tags = updatedTags;

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [ufAuth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
    }

    // Only allow the post creater or an admin to update
    const tenantId = req.auth.tenantId;
    const roles = req.auth.authorization[tenantId].roles;
    if (post.user !== req.auth.userUuid && !roles.includes('admin')) {
      return res.status(401).json({ errors: [{ msg: 'User not Authorised' }] });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // @route    GET api/posts/:id
// // @desc     Get post by ID
// // @access   Private
// router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found' });
//     }

//     res.json(post);
//   } catch (err) {
//     console.error(err.message);

//     res.status(500).send('Server Error');
//   }
// });


// // @route    PUT api/posts/like/:id
// // @desc     Like a post
// // @access   Private
// router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post has already been liked
//     if (post.likes.some((like) => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Post already liked' });
//     }

//     post.likes.unshift({ user: req.user.id });

//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route    PUT api/posts/unlike/:id
// // @desc     Unlike a post
// // @access   Private
// router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post has not yet been liked
//     if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Post has not yet been liked' });
//     }

//     // remove the like
//     post.likes = post.likes.filter(
//       ({ user }) => user.toString() !== req.user.id
//     );

//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route    POST api/posts/comment/:id
// // @desc     Comment on a post
// // @access   Private
// router.post(
//   '/comment/:id',
//   auth,
//   checkObjectId('id'),
//   check('text', 'Text is required').notEmpty(),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const user = await User.findById(req.user.id).select('-password');
//       const post = await Post.findById(req.params.id);

//       const newComment = {
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id
//       };

//       post.comments.unshift(newComment);

//       await post.save();

//       res.json(post.comments);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// // @route    DELETE api/posts/comment/:id/:comment_id
// // @desc     Delete comment
// // @access   Private
// router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Pull out comment
//     const comment = post.comments.find(
//       (comment) => comment.id === req.params.comment_id
//     );
//     // Make sure comment exists
//     if (!comment) {
//       return res.status(404).json({ msg: 'Comment does not exist' });
//     }
//     // Check user
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     post.comments = post.comments.filter(
//       ({ id }) => id !== req.params.comment_id
//     );

//     await post.save();

//     return res.json(post.comments);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).send('Server Error');
//   }
// });

module.exports = router;