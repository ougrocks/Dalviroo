'use strict';

var Mongoose = require('mongoose'), autoIncrement = require('mongoose-auto-increment');
var ObjectId = Mongoose.Schema.Types.ObjectId;
var currentdate = new Date();
var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/"
    + currentdate.getFullYear();
var RawToCreatedPredictSchema = new Mongoose.Schema({
    pid: { type: Number, required: true},
    createdtillnow: { type: Number, default: 0},
    predicted: {type: Number, required: true},
    created_date: { type: String, default: datetime }
})

RawToCreatedPredictSchema.plugin(autoIncrement.plugin, 'rawtocreatedpredictmapping');

var rawPredictedModel = Mongoose.model('rawtocreatedpredictmapping', RawToCreatedPredictSchema);

module.exports = rawPredictedModel;
