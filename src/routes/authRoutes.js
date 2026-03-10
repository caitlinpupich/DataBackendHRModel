// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const dataManager = require('../models/dataManager');

// GET: Display the Signup Page
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Create HR Account' });
});

// POST: Handle the Signup Form Submission
router.post('/signup', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('signup', { error: 'All fields are required!' });
        }

        const newUser = {
            id: Date.now(),
            username: username,
            password: password 
        };

        // Await the file system operation
        await dataManager.saveUser(newUser);

        res.redirect('/login');
    } catch (error) {
        // Send technical errors to your global error handler
        next(error);
    }
});

// GET: Display the Login Page
router.get('/login', (req, res) => {
    res.render('login', { title: 'HR Login' });
});

// POST: Handle the Login Form Submission
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        // Await the file system operation
        const users = await dataManager.getUsers();

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            res.redirect('/dashboard');
        } else {
            // This is a "User Error", not a "Server Error", so we don't use next(error)
            res.render('login', { 
                title: 'HR Login', 
                error: 'Invalid username or password' 
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;