import express from 'express';
import jwt from 'jsonwebtoken';

import Swap from '../models/swap.js';
import Item from '../models/item.js';
import User from '../models/user.js';

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

router.post('/:itemId/request', auth, async (req, res) => {
  const item = await Item.findById(req.params.itemId);
  if (!item || item.status !== 'available') return res.status(400).send('Invalid item');

  const swap = new Swap({
    item: item._id,
    fromUser: req.user.id,
    toUser: item.uploader,
    method: 'swap'
  });
  item.status = 'requested';
  await item.save();
  await swap.save();
  res.status(201).send('Swap requested');
});

router.get('/my-swaps', auth, async (req, res) => {
  const swaps = await Swap.find({
    $or: [
      { fromUser: req.user.id },
      { toUser: req.user.id }
    ]
  }).populate('item');
  res.json(swaps);
});

module.exports = router;
