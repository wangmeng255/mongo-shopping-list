global.DATABASE_URL = 'mongodb://wangmeng255:SoundwaveLi00@ds139985.mlab.com:39985/mongo_data/shopping-list';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

var Item = require('./models/item');

app.get('/items', function(req, res) {
    Item.find(function(err, items) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

app.post('/items', function(req, res) {
    Item.create({
        name: req.body.name
    }, function(err, item) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

app.put('/items/:id', function(req, res) {
    if(!req.body.hasOwnProperty('id') && !req.body.hasOwnProperty('name')) 
        return res.status(500).json({
                message: 'Internal Server Error'
            });
    Item.update({_id: req.body.id}, {name: req.body.name}, function(err, item) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);
    })  
});

app.delete('/items/:id', function(req, res) {
    if(!req.params.id)
        return res.status(500).json({
                message: 'Internal Server Error'
            });
    Item.findOneAndRemove({_id: req.params.id}, function(err) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json({_id: req.params.id});
    });
});

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if(err && callback) {
            return callback(err);
        }
        
        app.listen(config.PORT, function() {
            console.log("Listening on localhost: " + config.PORT);
            if(callback) {
                callback();
            }
        });
    });
};

if(require.main === module) {
    runServer(function(err) {
        if(err) {
            console.error(err);
        }
    });
}

exports.app = app;
exports.runServer = runServer;