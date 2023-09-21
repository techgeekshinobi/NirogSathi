const User = require('../database/user-schema');
const Consult = require('../database/consult-schema');

const homeRoute = async (req, res) => {
    res.status(200).json({ message: "Welcome to NirogSathi"});
}

const signupHandler = async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        if(result){
            res.status(201).json(result);
        }else{
            res.status(401).json({message:"User not ssaved"});
        }
    }
    catch (err) {
        console.log(err);
    }
}

const loginHandler = async (req, res) => {
    const { biometric } = req.body;
    const result = await User.findOne({biometric});
    if(result){
        return res.status(200).json(result);;
    }else{
        return res.status(404).json({message:"User does not exist"});
    }

}

const consultHandler = async (req, res) => {
    try {
        const consult = new Consult(req.body);
        const result = await consult.save();
        if(result){
            res.status(201).json(result);
        }else{
            res.status(401).json({message:"Consultation not saved"});
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    homeRoute,
    signupHandler,
    loginHandler,
    consultHandler
}