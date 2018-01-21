'use strict';

var Mongoose = require('mongoose'), autoIncrement = require('mongoose-auto-increment');
var ObjectId = Mongoose.Schema.Types.ObjectId;

var currentdate = new Date();
var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/"
    + currentdate.getFullYear();

var OrdersSchema = new Mongoose.Schema({
    pid: { type: Number, required: true},
    quantity: { type: Number, required: true},
    predict_id: { type: Number, required: true},
    status: { type: Boolean, required: true, default: false},
    created_date: { type: String, default: datetime}
})


OrdersSchema.plugin(autoIncrement.plugin, 'orders');

var ordersModel = Mongoose.model('orders', OrdersSchema);

module.exports = ordersModel;