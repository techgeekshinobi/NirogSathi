const express = require('express');
const route = express.Router();
const {
    homeRoute,
    signupHandler,
    loginHandler
} = require('../controller/handler');


route.get('/', homeRoute);
route.post('/signup', signupHandler);
route.post('/login', loginHandler);

module.exports = route;