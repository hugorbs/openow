const xmlParse = require('xml2js').Parser({explicitRoot: false, explicitArray: false});

exports.getHeaders = function (content) {
    var response = [];
    var result = xmlParse.parseString(content, function (err, result) {
        for (key in result) {
            const arr = result[key];
            for (attr in arr[0]) {
                response.push(attr);
            }
            break;
        }
    });
    return response;
};

exports.getRows = function (content) {
    var response = [];
    var result = xmlParse.parseString(content, function (err, result) {
        for (key in result) {
            response = result[key];
            break;
        }
    });
    console.log(response);
    return response;
};