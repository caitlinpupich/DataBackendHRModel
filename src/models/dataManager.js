// src/models/dataManager.js
const fs = require('fs').promises; // Use the promises version of fs
const path = require('path');

const isTest = process.env.NODE_ENV === 'test';

// Define the employees path dynamically based on the environment
const employeesPath = isTest 
    ? path.join(__dirname, '../../cypress/fixtures/mockEmployees.json') 
    : path.join(__dirname, '../../data/employees.json');

const usersPath = isTest
    ? path.join(__dirname, '../../cypress/fixtures/mockUsers.json')
    :path.join(__dirname, '../../data/users.json')

// Helper to ensure files exist asynchronously
const ensureFileExists = async (filePath) => {
    try {
        await fs.access(filePath); // Check if file exists
    } catch {
        // If it doesn't exist, create it with an empty array
        await fs.writeFile(filePath, JSON.stringify([], null, 2));
    }
};

const dataManager = {
    // 1. GET ALL EMPLOYEES
    getEmployees: async () => {
        try {
            await ensureFileExists(employeesPath);
            const data = await fs.readFile(employeesPath, 'utf8');
            return JSON.parse(data || '[]');
        } catch (err) {
            console.error("Error reading employees:", err);
            return [];
        }
    },

    // 2. SAVE NEW EMPLOYEE
    saveEmployee: async (newEmployee) => {
        try {
            const employees = await dataManager.getEmployees();
            employees.push(newEmployee);
            await fs.writeFile(employeesPath, JSON.stringify(employees, null, 2));
            return true;
        } catch (err) {
            console.error("Error saving employee:", err);
            return false;
        }
    },

    // 3. DELETE AN EMPLOYEE
    deleteEmployee: async (id) => {
        try {
            const employees = await dataManager.getEmployees();
            const updatedEmployees = employees.filter(emp => emp.id !== Number(id));
            await fs.writeFile(employeesPath, JSON.stringify(updatedEmployees, null, 2));
        } catch (err) {
            console.error("Error deleting employee:", err);
        }
    },

    // 4. GET ALL USERS
    getUsers: async () => {
        try {
            await ensureFileExists(usersPath);
            const data = await fs.readFile(usersPath, 'utf8');
            return JSON.parse(data || '[]');
        } catch (err) {
            console.error("Error reading users:", err);
            return [];
        }
    },

    // 5. SAVE NEW USER
    saveUser: async (newUser) => {
        try {
            const users = await dataManager.getUsers();
            users.push(newUser);
            await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
            return true;
        } catch (err) {
            console.error("Error saving user:", err);
            return false;
        }
    }
  
};

module.exports = dataManager;