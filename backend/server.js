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

        // ── Middleware (must come BEFORE routes so CORS headers are on every response) ──
        const allowedOrigins = [
            'https://hmavoyages.com',
            'https://www.hmavoyages.com',
            'http://localhost:5173',
            process.env.CLIENT_URL,
        ].filter(Boolean);

        app.use(cors({
            origin: function (origin, callback) {
                // Allow requests with no origin (mobile apps, curl, server-to-server)
                if (!origin) return callback(null, true);
                if (allowedOrigins.includes(origin)) {
                    return callback(null, true);
                }
                return callback(new Error('Not allowed by CORS: ' + origin), false);
            },
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));

        // Respond to preflight OPTIONS requests immediately
        app.options('*', cors());

        app.use(morgan('dev'));
        // NOTE: Do NOT apply express.json() globally — it consumes the raw stream
        // that multer needs for multipart/form-data requests (causes "Unexpected end of form").
        // Instead, apply body parsers only to the routes that need them (see below).

        const adminJs = new AdminJS({
            resources: [User, Testi, Gallery, TourPackage],
            rootPath: '/admin',  // ✅ MUST NOT be '/' — it would intercept all API routes
        });

        // Initialize Router
        const adminRouter = AdminJSExpress.buildRouter(adminJs);
        app.use(adminJs.options.rootPath, adminRouter);
        // AdminJS is now at: https://backend.hmavoyages.com/admin

        // Body parsers scoped to JSON-only routes (excluded from /upload which uses multer)
        const jsonParser = express.json();
        const urlencodedParser = express.urlencoded({ extended: true });

        // Routes
        app.use('/users',        jsonParser, urlencodedParser, userRoutes);
        app.use('/testimonials', jsonParser, urlencodedParser, testiRoutes);
        app.use('/gallery',      jsonParser, urlencodedParser, galleryRoutes);
        app.use('/packages',     jsonParser, urlencodedParser, tourPackageRoutes);
        app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        app.use('/upload', uploadRoutes); // multer handles its own body parsing — NO json/urlencoded here

        // Global error handler — logs full detail so you can diagnose 500s from server logs
        app.use((err, req, res, next) => {
            console.error('━━━ UNHANDLED ERROR ━━━');
            console.error('Route  :', req.method, req.originalUrl);
            console.error('Body   :', JSON.stringify(req.body));
            console.error('Message:', err.message);
            console.error('Stack  :', err.stack);
            console.error('━━━━━━━━━━━━━━━━━━━━━━');
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
