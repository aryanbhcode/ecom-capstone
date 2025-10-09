const express = require('express');
const connect = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cors = require('cors');

require('dotenv').config();

const app = express();

connect();

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('API is running');
});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
