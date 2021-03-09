const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const ufAuth = require('../../middleware/ufAuth');
const Data = require('../../models/Data');
// const User = require('../../models/User');

// @route   GET api/data
// @desc    Get all data records
// @access  Public
router.get('/', async (req, res) => {
  try {
    const data = await Data.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/data/:id
// @desc    Get data by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ msg: 'Record not found' });
    }

    res.json(data);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Record not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/data
// @desc    Create a data entry
// @access  Private
router.post('/', [
    ufAuth, [check('text', 'Text is required').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.auth.isConfirmed) {
      return res.status(403).json({ errors: [{msg: 'Account not verified.'}] });
    }

    try {
      // const user = await User.findById(req.user.id).select('-password');
      const newData = new Data({
        text: req.body.text,
        userId: req.auth.userUuid,
        userName: req.user.name
      });

      const data = await newData.save();

      res.json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/data/:id
// @desc    Delete a data record
// @access  Private
router.delete('/:id', ufAuth, async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ msg: 'Entry not found' });
    }

    // Check user owns post
    if (data.user.toString() !== req.auth.userUuid) {
      return res.status(401).json({ msg: 'Can only delete own posts' });
    }

    await data.remove();

    res.json({ msg: 'Data record Removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Data record not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;