const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const uploadRoutes = express.Router();

const parserCSV = require('../file-readers/file-reader-csv');
const parserXML = require('../file-readers/file-reader-xml');

let Database = require('../models/database');;

uploadRoutes.post('/headers', upload.single('file'), function (req, res, next) {
    const content = req.file.buffer.toString();

    var result = {};

    switch (req.file.mimetype) {
        case 'text/csv':
            result = parserCSV.getHeaders(content);
            res.status(200).json(result.data[0]);
        break;
        case 'text/xml':
            result = parserXML.getHeaders(content);
            res.status(200).json(result);
        break;
        default: 
            res.status(500).send();
    }
});

uploadRoutes.post('/save', upload.fields([{
        name: 'file', maxCount: 1
    }, {
        name: 'obj', maxCount: 1
    }]), function (req, res, next) {

    let database = new Database(JSON.parse(req.files.obj[0].buffer.toString()));
    database.save();

    let result = {};

    switch (req.files.file[0].mimetype) {
        case 'text/csv':
            result = parserCSV.getRows(req.files.file[0].buffer.toString());
            result = result.data;
        break;
        case 'text/xml':
            result = parserXML.getRows(req.files.file[0].buffer.toString());
        break;
    }

    const dynamicModel = require('../models/dynamic-model')(database.name, mountSchema(database.columns));

    dynamicModel.insertMany(result).then(database => {
        res.status(200).json({'database': 'database added successfully'});
    })
    .catch(err => {
        res.status(400).send("unable to save");
    });
});

mountSchema = function(headers) {
    let schema = {};

    for (let i of headers) {
        schema[i] = {}
    }

    return schema; 
}

module.exports = uploadRoutes;