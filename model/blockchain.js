const mongoose = require('mongoose');
const Schema = mongoose.Schema();


//Schema for the block
let BlockchainSchema = mongoose.Schema({
    timestamp: {type:Number, required:true},
    data: [{
        name: {type:String},
        Dob: {type:String},
        dateOfIssue: {type:String},
        marks: [{
            subject: {type: String},
            marks: {type: Number}
        }],
        Hash: {type:String},
        previousHash: {type: String}
    }],
    index: {type:Number},
    previousHash: {type:String},
    nounce: {type:Number},
    Hash: {type:String}
});
var BlockchainDataBase = mongoose.model('blockchain', BlockchainSchema);

module.exports = BlockchainDataBase;