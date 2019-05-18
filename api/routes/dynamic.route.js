const express = require('express');
const app = express();
const dynamicRoutes = express.Router();
let API = require('../models/api');
let Database = require('../models/database');
const mongoose = require('../mongoose.js');

dynamicRoutes.route('/:api/:endpoint').get(function (req, res) {
    const apiName = req.params.api;
    const endpointName = req.params.endpoint;

    API.findOne({ name: apiName }, function(err1, res1) {
        const api = res1;

        const endpoint = api.endpoints.filter((e) => e.name === endpointName);

        const formula = endpoint[0].formula.split('.');

        const key = formula[1];

        const config = {_id: 0};
        config[key] = 1;

        mongoose.connection.db.collection('db-' + formula[0]).find({}).project(config).limit(10000).toArray(async function(err2, res2) {
            return res.send(res2);
        });
    });
});

mountSchema = function(headers) {
    let schema = {};

    for (let i of headers) {
        schema[i] = {}
    }

    return schema; 
}

module.exports = dynamicRoutes;