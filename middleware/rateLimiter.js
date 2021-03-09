// import rateLimit from 'express-rate-limit';
const rateLimit = require('express-rate-limit');

// 10 login attempts in 10 minutes
const loginRateLimiter = rateLimit({
  windowMs: 1 * 10 * 60 * 1000, // hh * mm * ss * 1000ms
  max: 10, 
  message: { errors: [{msg: 'Login attempts exceeded. Try again later'}] },
  headers: true
});
module.exports = loginRateLimiter;