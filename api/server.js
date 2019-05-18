const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors');

    const apiRoute = require('./routes/api.route');
    const databaseRoute = require('./routes/database.route');
    const uploadRoute = require('./routes/upload.route');
    const dynamicRoute = require('./routes/dynamic.route');

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/api', dynamicRoute);
    app.use('/apis', apiRoute);
    app.use('/databases', databaseRoute);
    app.use('/file-upload', uploadRoute);

    const port = process.env.PORT || 4000;

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });