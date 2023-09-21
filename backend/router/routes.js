const express = require('express');
const route = express.Router();
const {
    homeRoute,
    signupHandler,
    loginHandler,
    consultHandler,
    readConsult
} = require('../controller/handler');

route.get('/', homeRoute);
route.post('/signup', signupHandler);
route.post('/login', loginHandler);
route.post('/consult', consultHandler);
route.get('/consult', readConsult);

module.exports = route;