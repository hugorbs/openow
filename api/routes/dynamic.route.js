const express = require('express');
const app = express();
const dynamicRoutes = express.Router();
const parser = require('../parser/parser.js');
let API = require('../models/api');
let Database = require('../models/database');
const mongoose = require('../mongoose.js');

dynamicRoutes.route('/:api').get(function (req, res) {
    const apiName = req.params.api;

    API.findOne({ name: apiName }, { '_id': 0, 'endpoints._id': 0, 'endpoints.formula': 0}, function(err1, res1) {
        return res.send({
            name: res1.name, 
            description: res1.description,
            active: res1.active,
            endpoints: res1.endpoints
        });
    });
});

dynamicRoutes.route('/:api/:endpoint').get(function (req, res) {
    const apiName = req.params.api;
    const endpointName = req.params.endpoint;

    API.findOne({ name: apiName }, async function(err1, res1) {
        let result = {};
        const api = res1;

        const endpoint = api.endpoints.filter((e) => e.name === endpointName);

        const dict = parser.query(endpoint[0].formula);

        for (key in dict) {
            const config = {_id: 0};
            for (field of dict[key]) {
                config[field] = 1;
            }
            
            let res2 = await mongoose.connection.db.collection('db-' + key).find({}).project(config).limit(100000).toArray();
            result[key] = res2;
        }

        return res.send(result);
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