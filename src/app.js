// src/app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const hrRoutes = require('./routes/hrRoutes');

// 1. Set up View Engine (Pug)
app.set('view engine', 'pug');

// Manually tell Express where the views are using a string
// Since app.js is in /src, we just add '/views' to the end
app.set('views', __dirname + '/views'); 

// 2. Middlewares
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
// 2r. Router Middleware
app.use('/', authRoutes)
app.use('/', hrRoutes)

// For the public folder, go "up" one level (..) to get to app.js (in root folder)
app.use(express.static(__dirname + '/../public'));

// 3. Test Route
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'HR Portal', 
        message: 'Welcome!' 
    });
});

//4. 404 Handler; triggers if NONE of the routes above match
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Page Not Found',
        path: req.originalUrl 
    });
});

//5. Global Error Handler; triggers if any route calls next(err) (aka, error in my code)
app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err.stack); // Logs to your terminal
    res.status(500).render('error', { 
        title: 'Something Went Wrong',
        message: 'Our server encountered an error. Please try again later.'
    });
});

module.exports = app;