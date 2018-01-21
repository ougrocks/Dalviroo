'use strict';

var ordersModel = require('../database').models.orders;

var create = function (data, callback){
    var newOrders = new ordersModel(data);
    newOrders.save(callback);
};

var findById = function (id, callback){
    ordersModel.findById(id, callback);
};

var getAll = function (callback) {
    ordersModel.find(callback);
}

module.exports = {
    create,
    findById,
    getAll
};