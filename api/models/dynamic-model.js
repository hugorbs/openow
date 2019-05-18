var mongoose  =  require('mongoose');
var Schema  =  mongoose.Schema;

function dynamicModel(name, schema){

    var dbSchema = new Schema(schema);

    return mongoose.model('db-' + name, dbSchema);

}

module.exports = dynamicModel;