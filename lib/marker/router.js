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
        model.create(req.params, function(err, marker) {
            if (err) {
                error(res);
            }
            else {
                res.send(201);
            }
        });
    },

    read: function(req, res, next) {
        model.read(req.params.markerid, function(err, marker) {
            if (err) {
                error(res);
            }
            else {
                res.send(marker);
            }
        });
    },

    replace: function(req, res, next) {
        if (req.body._id) {
            model.replace(req.body, callback);
        }
        else {
            this.create.apply(this, arguments);
        }

        function callback(err, marker) {
            if (err) {
                error(res);
            }
            else {
                res.send(204);
            }
        }
    },

    'delete': function(req, res, next) {
        model.delete(req.params.markerid, function(err) {
            if (err) {
                error(res);
            }
            else {
                res.send(204);
            }
        });
    }
};

function error(res) {
    res.send(418, "I'm a teapot");
}
