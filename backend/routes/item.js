import express from 'express';
import jwt from 'jsonwebtoken';

import Item from '../models/item.js';
import User from '../models/user.js';

const router = express.Router();


// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Upload a new item
router.post('/', auth, async (req, res) => {
  const newItem = new Item({ ...req.body, uploader: req.user.id });
  await newItem.save();
  res.status(201).json(newItem);
});

// Get all items
router.get('/', async (req, res) => {
  const items = await Item.find({ status: 'available' }).populate('uploader', 'email');
  res.json(items);
});

// Get item detail
router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id).populate('uploader', 'email');
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// Redeem via points
router.post('/:id/redeem', auth, async (req, res) => {
  const item = await Item.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (user.points < 10) return res.status(400).send('Not enough points');
  user.points -= 10;
  item.status = 'swapped';
  await user.save();
  await item.save();
  res.send('Redeemed item using points');
});

export default router;
