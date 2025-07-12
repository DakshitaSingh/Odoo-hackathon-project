import express from 'express';
import jwt from 'jsonwebtoken';
import Item from '../models/item.js';

const router = express.Router();


// Middleware to verify admin
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || user.role !== 'admin') return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/pending', adminAuth, async (req, res) => {
  const items = await Item.find({ status: 'available' });
  res.json(items);
});

router.delete('/item/:id', adminAuth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send('Item removed');
});

module.exports = router;