/*
 * somap
 * https://github.com/Ralt/somap
 *
 * Copyright (c) 2012 Florian Margaine
 * Licensed under the MIT license.
 */

'use strict';

var restify = require('restify'),
    router = require('./marker/router');

var server = restify.createServer();

/**
 * Server configuration.
 */
server.use(restify.queryParser());
server.use(restify.bodyParser());

/**
 * Simple REST-like server.
 */

// List
server.get('/markers', router.list);

// Create
server.post('/markers', router.create);

// Read
server.get('/markers/:markerid', router.read);

// Replace or create
server.put('/markers/:markerid', router.replace);

// Delete
server.del('/markers/:markerid', router['delete']);

module.exports = {
    listen: function() {
        server.listen.apply(server, arguments);
    }
};
