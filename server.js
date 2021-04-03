const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect to database
connectDB();

// Define security policy
// The following are only for the userfront pwd reset form:
//         defaultSrc: 'https://api.userfront.com', 'https://api.anymod.com/'
//         scriptSrc:   unsafe-eval
const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", 
      'https://api.userfront.com', 
      'https://api.anymod.com/',
      'https://www.youtube.com/'
      ],
      scriptSrc: [
        "'self'", "'unsafe-inline'", "'unsafe-eval'", 
        process.env.APP_URL, 
        'https://www.youtube.com'
      ],
      styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:',  'https://i.ytimg.com'], // 'https://*.com'],
      fontSrc: ["'self'", 'https://*.com', 'data:']
    },
  }
};

// Init Middlewre
app.use(helmet(helmetConfig));  
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));