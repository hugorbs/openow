const express = require('express');
const app = express();
const databaseRoutes = express.Router();
const mongoose = require('../mongoose.js');

let Database = require('../models/database');

databaseRoutes.route('/add').post(function (req, res) {
    let database = new Database(req.body);
    database.save()
        .then(database => {
        res.status(200).json({'database': 'database added successfully'});
        })
        .catch(err => {
        res.status(400).send("unable to save");
        });
});

databaseRoutes.route('/').get(function (req, res) {
    Database.find(function (err, databases){
    if(err){
      console.log(err);
    }
    else {
      res.json(databases);
    }
  });
});

databaseRoutes.route('/delete/:id').get(function (req, res) {
  Database.findOneAndDelete({_id: req.params.id}, function(err, database){
      if(err) {
        res.json(err);
      } else {
        mongoose.connection.db.dropCollection(database.name, function (error, result) {
          if (error) {
              console.log("error delete collection");
              res.json(error);
          } else {
              console.log("delete collection success");
              res.json('Successfully removed');
          }
        });
      }
  });
});

module.exports = databaseRoutes;