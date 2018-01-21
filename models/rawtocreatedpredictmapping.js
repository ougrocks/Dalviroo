'use strict';

var rawPredictedModel = require('../database').models.rawtocreatedpredictmapping;

var create = function (data, callback){
    var newRawMaterial = new rawPredictedModel(data);
    newRawMaterial.save(callback);
};

var findOne = function (data, callback){
    rawPredictedModel.findOne(data, callback);
}

var findById = function (id, callback){
    rawPredictedModel.findById(id, callback);
};

var findOrCreate = function(data, callback){
    findOne({'pid': data.pid, 'date': data.date}, function(err, predicted){
        if(err) { return callback(err); }
        if(predicted){
            return callback(err, predicted);
        } else {
            var predictedData = {
                pid: data.pid,
                predicted: data.predicted
            };


            create(predictedData, function(err, newPrediction){
                callback(err, newPrediction);
            });
        }
    });
};

var getAll = function (callback) {
    rawPredictedModel.find(callback);
};

var findOneAndUpdate = function (data, quantity, callback) {
    findOne(data, function (err, response) {
        var completed_till_now = response['createdtillnow'] + quantity;
        rawPredictedModel.findOneAndUpdate(data, {$set:{createdtillnow:completed_till_now}}, {new: true}, callback);
    });
};

module.exports = {
    create,
    findOne,
    findById,
    findOrCreate,
    getAll,
    findOneAndUpdate
};