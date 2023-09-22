const mongo = require('mongoose');

const consult = new mongo.Schema({
    patient_id:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    symptoms:[{
        type:String,
        required:false
    }],
    concern:[{
        type:String,
        required:false
    }]
})

const Consult = mongo.model('consult', consult);

module.exports = Consult;