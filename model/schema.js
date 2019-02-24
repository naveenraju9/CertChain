const mongoose = require('mongoose');
const Schema = mongoose.Schema();
let CertificateSchema = new Schema({
    name: {type:String},
    Dob: {type:String},
    marks: [],
    Hash: {type:String},
    previousHash: {type: String}
});
let BlockchainSchema = new Schema({
    timestamp: {type:Number, required:true},
    data: {
    },
    index: {type:Number},
    previousHash: {type:String},
    nounce: {type:Number},
    Hash: {type:String}

});
