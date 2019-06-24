const express = require('express');
const app = express();
const apiRoutes = express.Router();
const mongoose = require('../mongoose.js');
const parser = require('../parser/parser.js');
let API = require('../models/api');

apiRoutes.route('/add').post(function (req, res) {
    let api = new API(req.body);
    api.save()
        .then(database => {
        res.status(200).json({'API': 'API added successfully'});
        })
        .catch(err => {
        res.status(400).send("unable to save");
        });
});

apiRoutes.route('/evaluate').post(function (req, res) {
  const param = req.body.parameter;
  res.status(200).json(parser.evaluate(param));
}); 

apiRoutes.route('/').get(function (req, res) {
    API.find(function (err, apis){
    if(err){
      console.log(err);
    }
    else {
      res.json(apis);
    }
  });
});

apiRoutes.route('/delete/:id').get(function (req, res) {
  API.findOneAndDelete({_id: req.params.id}, function(err, database){
      if(err) {
        res.json(err);
      } else {
        res.status(200).json({'API': 'API deleted successfully'});
      }
  });
});

module.exports = apiRoutes;