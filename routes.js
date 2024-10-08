const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

route.get('/', homeController.index);

//routes of login

route.get('/login', loginController.index);

module.exports = route;