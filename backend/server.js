// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js'; // Make sure this exists
import userRoutes from './routes/user.js'
// --- Setup ---
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Required for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Static upload directory ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// --- Multer configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// --- Simulated delay helper ---
const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Mock Data ---
let mockUserProfile = {
  avatar: 'https://picsum.photos/120/120?random=1',
  name: 'ReWear Enthusiast',
  email: 'rewear.user@example.com',
  location: 'Gorakhpur, India',
  memberSince: 'Mar 2024',
  pointsBalance: 750,
  totalSwapsCompleted: 5,
  itemsGiven: 8,
  itemsRedeemed: 3
};

let mockListings = [
  { id: 'l1', name: 'Vintage Leather Jacket', image: 'https://picsum.photos/300/300?random=101', description: 'Stylish genuine leather jacket, perfect for fall.', isHighlighted: true, category: 'Outerwear', type: 'Jacket', size: 'M', condition: 'Excellent Used', tags: ['leather', 'vintage', 'menswear'], points: 150, dateListed: '2024-07-01' },
  { id: 'l2', name: 'Summer Floral Dress', image: 'https://picsum.photos/300/300?random=102', description: 'Light and airy floral dress, ideal for summer outings.', isHighlighted: false, category: 'Dresses', type: 'Dress', size: 'S', condition: 'Good Used', tags: ['floral', 'summer', 'womenswear'], points: 100, dateListed: '2024-06-28' },
  { id: 'l3', name: 'Kids Denim Jeans', image: 'https://picsum.photos/300/300?random=103', description: 'Durable denim jeans for active kids, gently used.', isHighlighted: false, category: 'Bottoms', type: 'Jeans', size: 'Kids 6T', condition: 'Fair Used', tags: ['kids', 'denim'], points: 60, dateListed: '2024-07-05' },
  { id: 'l4', name: 'Formal Blouse', image: 'https://picsum.photos/300/300?random=104', description: 'Elegant silk blouse, great for office wear.', isHighlighted: false, category: 'Tops', type: 'Blouse', size: 'L', condition: 'Excellent Used', tags: ['formal', 'silk'], points: 90, dateListed: '2024-06-20' },
  { id: 'l5', name: 'Athletic Running Shoes', image: 'https://picsum.photos/300/300?random=105', description: 'Comfortable running shoes, still in great shape.', isHighlighted: false, category: 'Footwear', type: 'Shoes', size: 'US 9', condition: 'Good Used', tags: ['athletic', 'sneakers'], points: 120, dateListed: '2024-07-03' },
  { id: 'l6', name: 'Hand-knitted Scarf', image: 'https://picsum.photos/300/300?random=106', description: 'Cozy, custom hand-knitted wool scarf.', isHighlighted: true, category: 'Accessories', type: 'Scarf', size: 'N/A', condition: 'New without Tags', tags: ['handmade', 'winter'], points: 80, dateListed: '2024-07-08' },
];
let nextListingId = 7;

let mockSwaps = [
  { id: 's1', name: 'Blue Denim Jacket', image: 'https://picsum.photos/200/200?random=201', status: 'Completed', swapDate: '2024-06-15', partner: 'Alice M.', type: 'Points Redemption', pointsUsed: 150 },
  { id: 's2', name: 'Red Wool Sweater', image: 'https://picsum.photos/200/200?random=202', status: 'Ongoing', swapDate: '2024-07-01', partner: 'Bob T.', type: 'Direct Swap', yourItem: 'My Grey Hoodie' },
  { id: 's3', name: 'Children\'s Raincoat', image: 'https://picsum.photos/200/200?random=203', status: 'Pending Approval', swapDate: '2024-07-10', partner: 'Charlie P.', type: 'Points Redemption', pointsUsed: 80 },
  { id: 's4', name: 'Striped Polo Shirt', image: 'https://picsum.photos/200/200?random=204', status: 'Completed', swapDate: '2024-05-20', partner: 'David L.', type: 'Direct Swap', yourItem: 'My Old T-Shirt' },
  { id: 's5', name: 'Vintage Sneakers', image: 'https://picsum.photos/200/200?random=205', status: 'Completed', swapDate: '2024-04-01', partner: 'Eve R.', type: 'Points Redemption', pointsUsed: 120 },
];
let nextSwapId = 6;

// --- Root route ---
app.get('/', (req, res) => {
  res.send('ReWear API is running');
});

// --- Auth routes ---
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

// --- Item/Profile/Swap routes ---
app.get('/api/user-profile', async (req, res) => {
  await simulateDelay(500);
  res.status(200).json({ data: mockUserProfile });
});

app.get('/api/my-listings', async (req, res) => {
  await simulateDelay(700);
  res.status(200).json({ data: mockListings });
});

app.get('/api/my-swaps', async (req, res) => {
  await simulateDelay(600);
  res.status(200).json({ data: mockSwaps });
});

app.post('/api/upload-item', upload.single('itemImage'), async (req, res) => {
  await simulateDelay(1000);
  const { name, description, category, type, size, condition, tags, points } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded.' });
  }

  if (!name || !category || !type || !size || !condition || !points) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: 'Missing required item details.' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  const newItem = {
    id: `l${nextListingId++}`,
    name,
    description,
    image: imageUrl,
    isHighlighted: false,
    category,
    type,
    size,
    condition,
    tags: tags ? tags.split(',').map(t => t.trim()) : [],
    points: parseInt(points, 10),
    dateListed: new Date().toISOString().split('T')[0]
  };

  mockListings.unshift(newItem);
  mockUserProfile.pointsBalance += Math.floor(newItem.points / 2);
  mockUserProfile.itemsGiven += 1;

  res.status(201).json({
    message: 'Item uploaded successfully!',
    item: newItem,
    updatedProfile: mockUserProfile
  });
});

// --- MongoDB + Server Start ---
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Uploads directory: ${uploadDir}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
})();
