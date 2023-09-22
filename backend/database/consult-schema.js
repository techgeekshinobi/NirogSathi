const mongo = require('mongoose');

const consult = new mongo.Schema({
    "Voice Input": [{
        type: String,
        required: true
    }],
    "Chatbot Response": [{
        type: String,
        required: true
    }]
})

const Consult = mongo.model('consult', consult);

module.exports = Consult;