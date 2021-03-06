const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  link: {
    type: String
  },
  video: {
    type: String
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  tags: [
    {
      tag: {
        type: String
      }
    }
  ],
  likes: [
    {
      user: {
        type: String
      }
    }
  ],
  comments: [
    {
      user: {
        type: String
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('post', PostSchema);