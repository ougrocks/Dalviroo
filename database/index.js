'use strict';

//import config from '../config';
//import Mongoose from 'mongoose';
var config = require('../config');
var Mongoose = require('mongoose'),  autoIncrement = require('mongoose-auto-increment');

//USE THIS DB CONNECTION STRING IF YOU HAVE PORT USER SET. ON LOCAL I DIDNT SET.
//var dbURI = "mongodb://"+config.db.username+ ":" + config.db.password + "@" + config.db.host + ":" + config.db.port + "/" + config.db.name;

var dbURI = "mongodb://" + config.db.host + "/" + config.db.name;

var con = Mongoose.connect(dbURI, {
    useMongoClient: true
});

autoIncrement.initialize(con);


Mongoose.connection.on('error', function(err) {
    if(err) throw err;
});

Mongoose.Promise = global.Promise;

module.exports = { Mongoose,
    models: {
        rawmaterial: require('./schemas/rawmaterial'),
        rawtocreatedpredictmapping: require('./schemas/rawtocreatedpredictmapping'),
        orders: require('./schemas/orders')
    }
};

