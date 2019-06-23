const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Database = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  columns: [{
    type: String
}]
},{
    collection: 'databases'
});

module.exports = mongoose.model('Database', Database);