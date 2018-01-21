'use strict';

//import Mongoose from 'mongoose';

var Mongoose = require('mongoose'), autoIncrement = require('mongoose-auto-increment');
var ObjectId = Mongoose.Schema.Types.ObjectId;
var currentdate = new Date();
var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/"
    + currentdate.getFullYear();
var RawMaterialSchema = new Mongoose.Schema({
    name: { type: String, required: 'Enter Raw Material Name.'},
    active: { type: Boolean, default: true },
    created_date: { type: String, default: datetime }
});

RawMaterialSchema.plugin(autoIncrement.plugin, 'rawmaterial');

var rawModel = Mongoose.model('rawmaterial', RawMaterialSchema);

module.exports = rawModel;


