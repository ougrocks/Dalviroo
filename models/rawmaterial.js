'use strict';

var rawModel = require('../database').models.rawmaterial;

var create = function (data, callback){
    var newRawMaterial = new rawModel(data);
    newRawMaterial.save(callback);
};

var findById = function (id, callback){
    rawModel.findById(id, callback);
};

var getAll = function (callback) {
    rawModel.find(callback);
};

var findOne = function (data, callback){
    rawModel.findOne(data, callback);
}

var findOrCreate = function(data, callback){
    findOne({'name': data.name}, function(err, predicted){
        if(err) { return callback(err); }
        if(predicted){
            return callback(err, predicted);
        } else {
            var newData = {
                name: data.name
            };


            create(newData, function(err, newDataCreate){
                callback(err, newDataCreate);
            });
        }
    });
};

module.exports = {
    create,
    findById,
    getAll,
    findOne,
    findOrCreate
};