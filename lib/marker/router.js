/*
 * somap
 * https://github.com/Ralt/somap
 *
 * Copyright (c) 2012 Florian Margaine
 * Licensed under the MIT license.
 */

'use strict';

var model = require('./model');

module.exports = {
    list: function(req, res, next) {
        model.list(req.query.limit, function(err, markers) {
            if (err) error(res);

            res.send(markers);
        });
    },

    create: function(req, res, next) {
        model.create(req.body, function(err, marker) {
            if (err) error(res);

            return redirect(res, next, '/markers' + marker.id);
        });
    },

    read: function(req, res, next) {
        model.read(req.params.markerid, function(err, marker) {
            if (err) error(res);

            res.send(marker);
        });
    },

    replace: function(req, res, next) {
        if (req.body.id) {
            model.replace(req.body, callback);
        }
        else {
            this.create.apply(this, arguments);
        }

        function callback(err, marker) {
            if (err) error(res);

            return redirect(res, next, '/markers' + marker.id);
        }
    }
};

function redirect(res, next, location) {
    res.header('Location', location);
    res.send(302);
    return next();
}

function error(res) {
    res.send(418, "I'm a teapot");
}
