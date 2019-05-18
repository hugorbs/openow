const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const uploadRoutes = express.Router();
const fileReader = require('../file-readers/file-reader-csv');
let Database = require('../models/database');;

uploadRoutes.post('/headers', upload.single('file'), function (req, res, next) {
    const result = fileReader.getHeaders(req.file.buffer.toString());
    res.status(200).json(result.data[0]);
});

uploadRoutes.post('/save', upload.fields([{
        name: 'file', maxCount: 1
    }, {
        name: 'obj', maxCount: 1
    }]), function (req, res, next) {

    let database = new Database(JSON.parse(req.files.obj[0].buffer.toString()));
    database.save();

    console.log('obj inserted');

    const result = fileReader.getRows(req.files.file[0].buffer.toString());

    console.log('parser done');

    const dynamicModel = require('../models/dynamic-model')(database.name, mountSchema(database.columns));

    dynamicModel.insertMany(result.data).then(database => {
        res.status(200).json({'database': 'database added successfully'});
    })
    .catch(err => {
        res.status(400).send("unable to save");
    });
    /*var bulk = dynamicModel.collection.initializeOrderedBulkOp(),
    counter = 0;

    result.data.forEach(function(doc) {
        //console.log(doc);
        bulk.insert(doc);

        counter++;
        if (counter % 500 == 0) {
            console.log('bulk execute');
            bulk.execute(function(err, r) {
            // do something with the result
            bulk = dynamicModel.collection.initializeOrderedBulkOp();
            counter = 0;
            });config = require('./DB')
        }
    });

    // Catch any docs in the queue under or over the 500's
    if (counter > 0) {
        bulk.execute(function(err,result) {
        // do something with the result here
        });
    }*/
});

mountSchema = function(headers) {
    let schema = {};

    for (let i of headers) {
        schema[i] = {}
    }

    return schema; 
}

module.exports = uploadRoutes;