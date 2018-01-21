var express = require('express');
var router = express.Router();
var app = express();

var RawMaterial = require('../models/rawmaterial');
var RawPrediction = require('../models/rawtocreatedpredictmapping');
var Orders = require('../models/orders');
var Display = require('../models/display');
var Report = require('../models/reports');





/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/order', function (req, res, next) {
    RawMaterial.getAll(function (err, response) {
        res.render('order', {resp: response});
        //res.send(response);
    })
});

router.post('/order', function (req, res, next) {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear();
    var predict_id = 0;
    RawPrediction.findOne({'pid': req.body.pid, 'created_date': datetime }, function (err, respData) {
        if(err) throw err;
        if(respData == null)
        {
            res.render('success', {success_resp: 'Daily Prediction value not set for product.'});
        } else {
            var data = {'pid': req.body.pid, 'quantity': req.body.quantity, 'predict_id': respData['_id'] };
            Orders.create(data, function (err, newData) {
                if(err) throw err;
                res.render('success', {success_resp: 'Order Placed Successfully!!'});
            });
        }
        //var data = {'pid': req.body.pid, 'quantity': req.body.quantity, 'predict_id': respData['_id'] };

    });
});

router.get('/add', function (req, res, next) {

    RawMaterial.getAll(function (err, response) {
        console.log(response);
        res.render('addproduct', {resp: response});
        //res.send(response);
    })
});

router.post('/add', function (req, res, next) {
    var data = {'name': req.body.name };
    RawMaterial.findOrCreate(data, function (err, newData) {
        if(err) throw err;
        res.redirect('/add');
        //res.render('success', {success_resp: 'Product added successfully!!'});
    })
});

router.get('/predict', function (req, res, next) {
    RawMaterial.getAll(function (err, response) {
        res.render('prediction', {resp: response});
        //res.send(response);
    })
});

router.post('/predict', function (req, res, next) {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear();
    var data = {'pid': req.body.pid, 'predicted': req.body.predicted};
    RawPrediction.findOrCreate(data, function (err, newData) {
        if(err) throw err;
        if(newData['created_date'] == datetime)
            //res.send(newData);
            res.redirect('/predict');
        else
            RawPrediction.create(data, function (err, newRes) {
                //res.render('success', {success_resp: 'Prediction set successfully!!'} );
                res.redirect('/predict');
            })
        //res.render('success', {success_resp: 'Prediction set successfully!!'});

    })
});



router.post('/done', function (req, res, next) {
    var data = {'_id': req.body._id };
    Display.findOneAndUpdate(data, function (err, response) {
        if(err) throw err;
        RawPrediction.findOneAndUpdate({"_id": response['predict_id']}, response['quantity'], function (err, update_resp) {
            if(err) throw err;
        });
        // res.io.on('connection', function (socket) {
        //     socket.broadcast.emit('news', { io_data: response });
        //     socket.on('my other event', function (data) {
        //         console.log(data);
        //     });
        // });
        res.io.emit('news', { io_data: response });
        res.redirect('/display');
    })
});

router.get('/display', function (req, res, next) {
    var data = {'status': false};
    var jsonResult = {};
    Display.display(data).exec(function(err, bikes){
        if(err) throw err;
        //console.log(bikes);
        res.io.on('connection', function (socket) {
            socket.broadcast.emit('news', { io_data: bikes });
            socket.on('my other event', function (data) {
                console.log(data);

            });
        });
        //res.io.emit("socketToMe", bikes);
        res.render('display', {display_data: bikes})
        //console.log(bikes);
    });



    // Display.find(data, function (err, response) {
    //     response.forEach(function (data) {
    //         console.log(data['pid']);
    //
    //
    //
    //         Display.display({'_id': data['pid']}).exec(function(err, bikes){
    //             if(err) throw err;
    //             //console.log(bikes);
    //             console.log(bikes);
    //         });
    //
    //
    //     });
    //
    //     res.render('display', {order_data: response});
    //     //res.send(response);
    // })
});

router.get('/report', function (req, res, next) {
    Report.gen_report_agg({}).exec(function (err, bikes) {
        if (err) throw err;
        console.log(bikes);

        res.render('report', {report_data: bikes});
        //console.log(bikes);
    });
});

module.exports = router;
