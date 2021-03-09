const { Router } = require('express');
const express = require('express');
const router = express.Router();
const ufAuth = require('../../middleware/ufAuth');


// @route   GET api/users/me
// @desc    Get user id for current logged-in user
//          May not actually be needed...
// @access  Private
router.get('/me', ufAuth, async (req, res) => {
  try {
    // return auth details as a stop-gap
    res.json(req.auth);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;