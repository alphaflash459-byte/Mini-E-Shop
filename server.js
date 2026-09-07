import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// In-memory mock data
const mockShop = {
  id: 1,
  username: "demo",
  name: "Mini Shop Demo",
  theme_color: "#6366f1",
  currency: "USD",
  status: "active"
};

const mockProducts = [
  {
    id: 1,
    shop_id: 1,
    name: "Classic T-Shirt",
    price: 19.99,
    description: "A comfortable classic t-shirt.",
    image_url: "https://via.placeholder.com/150",
    stock: 100,
    category_id: 1,
    status: "active"
  },
  {
    id: 2,
    shop_id: 1,
    name: "Coffee Mug",
    price: 9.99,
    description: "Ceramic coffee mug.",
    image_url: "https://via.placeholder.com/150",
    stock: 50,
    category_id: 2,
    status: "active"
  }
];

const mockCategories = [
  { id: 1, shop_id: 1, name: "Apparel" },
  { id: 2, shop_id: 1, name: "Accessories" }
];

// Mock API Routes
app.get('/api/shops/:username', (req, res) => {
  res.json(mockShop);
});

app.get('/api/products/public', (req, res) => {
  res.json(mockProducts);
});

app.get('/api/products/:id/public', (req, res) => {
  const product = mockProducts.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ detail: "Product not found" });
  }
});

app.get('/api/categories/public', (req, res) => {
  res.json(mockCategories);
});

app.post('/api/orders', (req, res) => {
  res.json({ id: 100, order_number: "ORD-12345", total: 29.98, status: "pending" });
});

// Stub remaining routes
app.use('/api', (req, res) => {
  res.status(501).json({ error: 'Not yet migrated' });
});

// Serve the frontend build
const buildPath = path.join(__dirname, 'Frontend_User', 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
