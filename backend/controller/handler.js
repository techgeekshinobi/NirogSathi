const sqlconn = require('../database/database');

const homeRoute = async (req, res) => {
    res.status(200).json({ message: "Welcome to NirogSathi"});
}

const signupHandler = async (req, res) => {
    try {
        const { id, name, age, gender, phone } = req.body;
    }
    catch (err) {
        console.log(err);
    }

}

const loginHandler = async (req, res) => {
    const { biometric } = req.body;

}

module.exports = {
    homeRoute,
    signupHandler,
    loginHandler
}