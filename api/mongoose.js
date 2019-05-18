mongoose = require('mongoose');
config = require('./DB');

let db = mongoose.connection;

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

module.exports = mongoose;