/*
 * somap
 * https://github.com/Ralt/somap
 *
 * Copyright (c) 2012 Florian Margaine
 * Licensed under the MIT license.
 */

'use strict';

var mongoose = require('mongoose'),
    db = mongoose.createConnection('localhost', 'markers'),
    Marker;

db.on('error', console.error.bind(console, 'DB Connection Error'));
db.once('open', function() {
    var markerSchema = new mongoose.Schema({
        lat: String,
        lon: String,
    });

    Marker = db.model('Marker', markerSchema);

    console.log('Schema initilized correctly.');
});

module.exports = {
    list: function(limit, callback) {
        var query = Marker.find().limit(limit);
        query.execFind(function(err, markers) {
            callback(err, markers);
        });
    },

    create: function(body, callback) {
        var marker = new Marker(body);
        marker.save(function(err) {
            callback(err, marker);
        });
    },

    read: function(id, callback) {
        Marker.findOne({_id: id}, function(err, marker) {
            callback(err, marker);
        });
    },

    replace: function(body, callback) {
        Marker.update({_id: body.id}, body, function(err, marker) {
            callback(err, marker);
        });
    }
};
