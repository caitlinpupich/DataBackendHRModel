// src/routes/hrRoutes.js
const express = require('express');
const router = express.Router();
const dataManager = require('../models/dataManager');

// 1. GET: Display the Employee Directory
router.get('/directory', async (req, res, next) => {
    try {
        const employees = await dataManager.getEmployees();
        res.render('directory', { 
            title: 'Employee Directory', 
            employees: employees 
        });
    } catch (error) {
        // Pass the error to the global handler in app.js
        next(error); 
    }
});

// 2. POST: Handle adding a new employee
router.post('/employees/add', async (req, res, next) => {
    try {
        const { name, department, email, phone } = req.body;

        const newEmployee = {
            id: Date.now(),
            name,
            department,
            email,
            phone
        };

        await dataManager.saveEmployee(newEmployee);
        res.redirect('/directory');
    } catch (error) {
        next(error);
    }
}); 

// 3. POST: Handle Employee Deletion
router.post('/employees/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await dataManager.deleteEmployee(id);
        res.redirect('/directory'); 
    } catch (error) {
        next(error);
    }
});

// 4. GET: Admin Dashboard
router.get('/dashboard', async (req, res, next) => {
    try {
        const employees = await dataManager.getEmployees();
        const deptList = ['Engineering', 'Human Resources', 'Marketing', 'Sales', 'Product'];

        res.render('dashboard', { 
            title: 'Admin Dashboard',
            employees: employees,
            departments: deptList, 
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;