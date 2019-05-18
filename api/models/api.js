const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let API = new Schema({
  name: {
    type: String
  },
  active: {
    type: Boolean
  },
  description: {
    type: String
  },
  endpoints: [
    {
      name: {type: String},
      description: {type: String},
      formula: {type: String}
    }
  ]
},{
    collection: 'apis'
});

module.exports = mongoose.model('API', API);