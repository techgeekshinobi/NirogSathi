const User = require('../database/user-schema');
const Consult = require('../database/consult-schema');

const homeRoute = async (req, res) => {
    res.status(200).json({ message: "Welcome to NirogSathi" });
}

const signupHandler = async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        if (result) {
            res.status(201).json(result);
        } else {
            res.status(401).json({ message: "User not ssaved" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Down" });
    }
}

const loginHandler = async (req, res) => {
    try {
        const { biometric } = req.body;
        const result = await User.findOne({ biometric });
        if (result) {
            return res.status(200).json(result);;
        } else {
            return res.status(404).json({ message: "User does not exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Down" });
    }
}

const consultHandler = async (req, res) => {
    try {
        const consult = new Consult(req.body);
        const result = await consult.save();
        if (result) {
            res.status(201).json(result);
        } else {
            res.status(401).json({ message: "Consultation not saved" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Down" });
    }
}

const readConsult = async (req, res) => {
    try {
        let query;
        const { _id, patient_id } = req.query;

        if (!_id && !patient_id) {
            query = {};
        } else if (!patient_id) {
            query = { _id };
        } else if (!_id) {
            query = { patient_id };
        } else {
            query = { _id, patient_id };
        }

        const result = await Consult.find(query);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: "No consultation fount" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Down" });
    }
}

module.exports = {
    homeRoute,
    signupHandler,
    loginHandler,
    consultHandler,
    readConsult
}