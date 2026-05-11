/**
 * Wenning Technology - Express.js Server
 * Production-ready web server with security and performance optimization
 */

import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========== Configuration ==========
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';
const isDevelopment = NODE_ENV === 'development';

console.log(`Starting Wenning Technology server in ${NODE_ENV} mode...`);

// ========== Security Middleware ==========
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            fontSrc: ["'self'", 'data:'],
            connectSrc: ["'self'"],
            frameAncestors: ["'none'"]
        }
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

// ========== CORS Configuration ==========
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000', 'https://hnwenning.com', 'https://www.hnwenning.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// ========== Compression ==========
app.use(compression({
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    },
    level: 6
}));

// ========== Body Parser ==========
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// ========== Static Files ==========
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1y',
    etag: true,
    index: false
}));

// Set cache headers for static files
app.use((req, res, next) => {
    if (req.url.match(/\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|otf)$/)) {
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (req.url.match(/\.html$/)) {
        res.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }
    next();
});

// ========== Request Logging ==========
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// ========== HTTP to HTTPS Redirect ==========
if (process.env.FORCE_HTTPS === 'true') {
    app.use((req, res, next) => {
        if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
            return res.redirect(301, `https://${req.get('host')}${req.url}`);
        }
        next();
    });
}

// ========== Routes ==========

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// HTML pages (with .html extension optional)
app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    
    // List of valid pages
    const validPages = ['services', 'culture', 'news', 'contact', 'privacy', 'terms'];
    
    if (validPages.includes(page)) {
        res.sendFile(path.join(__dirname, 'public', `${page}.html`), (err) => {
            if (err) {
                next();
            }
        });
    } else {
        next();
    }
});

// HTML pages with .html extension
app.get('/:page.html', (req, res, next) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'public', `${page}.html`), (err) => {
        if (err) {
            next();
        }
    });
});

// API Routes

/**
 * Contact form submission
 */
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, company, phone, subject, message } = req.body;
        
        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }
        
        // Log contact submission (in production, send email or store in database)
        console.log('Contact Form Submission:', {
            name,
            email,
            company,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString()
        });
        
        // In production, send email here
        // await sendEmail({...})
        
        res.json({
            success: true,
            message: 'Message received. We will contact you soon.'
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * Newsletter subscription
 */
app.post('/api/newsletter', (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }
        
        console.log('Newsletter Subscription:', {
            email,
            timestamp: new Date().toISOString()
        });
        
        // In production, add to newsletter list
        // await addToNewsletter(email)
        
        res.json({
            success: true,
            message: 'Successfully subscribed to our newsletter.'
        });
        
    } catch (error) {
        console.error('Newsletter error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

/**
 * Sitemap
 */
app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

/**
 * Robots.txt
 */
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// ========== 404 Handler ==========
app.use((req, res) => {
    console.log(`404 Not Found: ${req.url}`);
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found.',
        url: req.url
    });
});

// ========== Error Handler ==========
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    res.status(err.status || 500).json({
        error: err.name || 'Server Error',
        message: isDevelopment ? err.message : 'An error occurred. Please try again later.',
        ...(isDevelopment && { stack: err.stack })
    });
});

// ========== Server Start ==========
app.listen(PORT, () => {
    console.log(`✓ Wenning Technology server is running on http://localhost:${PORT}`);
    console.log(`✓ Environment: ${NODE_ENV}`);
    console.log(`✓ Public files directory: ${path.join(__dirname, 'public')}`);
    
    if (isDevelopment) {
        console.log('✓ Development mode enabled');
    }
});

// ========== Graceful Shutdown ==========
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

// ========== Unhandled Error Handler ==========
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
