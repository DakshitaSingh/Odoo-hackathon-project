const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getUserItems,
  getUserSwaps
} = require("../controllers/dashboardController");

router.get('/profile', getUserProfile);
router.get('/items', getUserItems);
router.get('/swaps', getUserSwaps);

module.exports = router;