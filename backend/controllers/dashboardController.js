const User = require("../models/user");
const Item = require("../models/Item");
const Swap = require("../models/swap");

// TEMP USER ID (simulate login)
const USER_ID = "replace_with_valid_mongo_id";

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(USER_ID).select("username email points");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ uploadedBy: USER_ID });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({ $or: [{ user1: USER_ID }, { user2: USER_ID }] });
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};