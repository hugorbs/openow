const fs = require('fs');
const Papa = require('papaparse');

exports.getHeaders = function (content) {
    return Papa.parse(content, {
        preview: 1,
        worker: true
    });
};

exports.getRows = function (content) {
    return Papa.parse(content, {
        worker: true,
        header: true
    });
};