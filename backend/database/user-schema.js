const mongo = require('mongoose');

const user = new mongo.Schema({
    biometric:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})

const User = mongo.model('user', user);

module.exports = User;