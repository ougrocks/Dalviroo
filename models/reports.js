'use strict';

var rawPredictedModel = require('../database').models.rawtocreatedpredictmapping;


// var find = function (data, callback) {
//     rawPredictedModel.find()
// }

var gen_report = function (data, callback) {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear();
    var query = rawPredictedModel.find({ "created_date": datetime}).select({ });
    return query;
};


var gen_report_agg = function (data, callback) {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear();
    var agg = rawPredictedModel.aggregate([
        { "$match": { "created_date": datetime} },
        {
            "$lookup": {
                "from": "rawmaterials",
                "localField": "pid",
                "foreignField": "_id",
                "as": "raw"
            }
        },
        {
            $unwind: "$raw"
        }
    ]);
    return agg;
}

module.exports = {
    gen_report,
    gen_report_agg
};