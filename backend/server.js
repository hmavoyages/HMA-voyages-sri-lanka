require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*' })); // Adjust CLIENT_URL in .env

// Import routes
const userRoutes = require('./Routes/UserRoutes');
const testiRoutes = require('./Routes/TestiRroutes');
const galleryRoutes = require('./Routes/galleryRoutes');
const tourPackageRoutes = require('./Routes/tourPackageRoutes');

const uploadRoutes = require('./Routes/upload');



// Route middleware
app.use('/users', userRoutes);
app.use('/testimonials', testiRoutes);
app.use('/gallery', galleryRoutes);
app.use('/packages', tourPackageRoutes);
// Define a route handler for '/api' endpoint
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload', uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const DB_URL = "mongodb+srv://hmav:hmav@cluster0.y3ms3bo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1); // Exit process if DB fails
    }
};

// Start the server after DB connection
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});



