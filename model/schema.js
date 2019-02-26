const mongoose = require('mongoose');
const Schema = mongoose.Schema();


//Individual Subjects schema
let marksSchema = new Schema({
    subject: {type: String},
    marks: {type: Number}
});

//Schema for individual Certificate
let CertificateSchema = new Schema({
    name: {type:String},
    Dob: {type:String},
    marks: [marksSchema],
    Hash: {type:String},
    previousHash: {type: String}
});

//Schema for the block
let BlockchainSchema = new Schema({
    timestamp: {type:Number, required:true},
    data: [CertificateSchema],
    index: {type:Number},
    previousHash: {type:String},
    nounce: {type:Number},
    Hash: {type:String}

});
