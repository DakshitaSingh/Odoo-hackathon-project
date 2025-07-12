import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  method: { type: String, enum: ['swap', 'points'] },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, { timestamps: true });

const Swap = mongoose.model('Swap', swapSchema);
export default Swap;