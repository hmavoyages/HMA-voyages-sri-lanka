const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

// Import Models
const User = require('./Model/UserModel');
const Testi = require('./Model/TestiModel');
const Gallery = require('./Model/GalleryModel');
const TourPackage = require('./Model/TourPackageModel');

// Routes
const userRoutes = require('./Routes/UserRoutes');
const testiRoutes = require('./Routes/TestiRroutes');
const galleryRoutes = require('./Routes/galleryRoutes');
const tourPackageRoutes = require('./Routes/tourPackageRoutes');
const uploadRoutes = require('./Routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = "mongodb+srv://hmav:hmav@cluster0.y3ms3bo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const startServer = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB Connected');

        // Dynamic modules for AdminJS (ESM packages)
        const { default: AdminJS } = await import('adminjs');
        const AdminJSExpress = await import('@adminjs/express');
        const AdminJSMongoose = await import('@adminjs/mongoose');

        AdminJS.registerAdapter({
            Database: AdminJSMongoose.Database,
            Resource: AdminJSMongoose.Resource
        });

        const adminJs = new AdminJS({
            resources: [User, Testi, Gallery, TourPackage],
            rootPath: '/',
        });

        // Initialize Router
        const adminRouter = AdminJSExpress.buildRouter(adminJs);
        app.use(adminJs.options.rootPath, adminRouter);

        // Middleware
        app.use(morgan('dev'));
        app.use(express.json());
        const allowedOrigins = [
            'https://hmavoyages.com',
            'https://www.hmavoyages.com',
            'http://localhost:5173',
            process.env.CLIENT_URL || '*'
        ];

        app.use(cors({
            origin: function (origin, callback) {
                if (!origin) return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1 && allowedOrigins.indexOf('*') === -1) {
                    // allow * if present in allowedOrigins
                    // actually if '*' is in list, we can just let it pass, but typically we want specific origins in production
                    // For now, let's just stick to the specific list + whatever is in env
                    
                    // Simple check
                     var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                     return callback(new Error(msg), false);
                }
                return callback(null, true);
            },
            credentials: true
        }));

        // Routes
        app.use('/users', userRoutes);
        app.use('/testimonials', testiRoutes);
        app.use('/gallery', galleryRoutes);
        app.use('/packages', tourPackageRoutes);
        app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        app.use('/upload', uploadRoutes);

        // Error handling
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ message: 'Something went wrong', error: err.message });
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`AdminJS started on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Server startup error:', error);
    }
};

startServer();
