import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import Item from '../models/item.js';

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Get user profile
router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// Get user's uploaded items
router.get('/my-items', auth, async (req, res) => {
  const items = await Item.find({ uploader: req.user.id });
  res.json(items);
});

export default router;