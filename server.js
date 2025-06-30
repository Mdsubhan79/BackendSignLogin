require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Routes (choose ONE approach below)
// --------------------------------------------------
// OPTION 1: If you MOVED files to /routes folder:
const authRoutes = require('./controllers/auth');
const userRoutes = require('./models/user');

// OPTION 2: If keeping files in ROOT:
// const authRoutes = require('./auth');
// const userRoutes = require('./user');
// --------------------------------------------------

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);  // Example additional route

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});