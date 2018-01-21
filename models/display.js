'use strict';

var ordersModel = require('../database').models.orders;

var find = function (data, callback){

    ordersModel.find(data, callback);
};



var display = function (data) {
    var agg = ordersModel.aggregate([
        { "$match": data },
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
        },
        {
            "$lookup": {
                "from": "rawtocreatedpredictmappings",
                "localField": "predict_id",
                "foreignField": "_id",
                "as": "predict_data"
            }
        },
        {
            $unwind: "$predict_data"
        }
    ]);
    return agg;
};


// var display = function (data, callback) {
//     ordersModel.aggregate([
//         { "$match": data },
//         {
//             "$lookup": {
//                 "from": "rawmaterials",
//                 "localField": "pid",
//                 "foreignField": "_id",
//                 "as": "raw"
//             }
//         },
//         {
//             $unwind: "$raw"
//         },
//         {
//             "$lookup": {
//                 "from": "rawtocreatedpredictmappings",
//                 "localField": "predict_id",
//                 "foreignField": "_id",
//                 "as": "predict_data"
//             }
//         },
//         {
//             $unwind: "$predict_data"
//         }
//     ]).exec(function(err, bikes){
//         if(err) throw err;
//         //console.log(bikes);
//         return bikes;
//     });
// };


var findOneAndUpdate = function (data, callback) {
    ordersModel.findOneAndUpdate(data, {$set:{status:true}}, {new: true}, callback);
};

module.exports = {
    find,
    display,
    findOneAndUpdate
};