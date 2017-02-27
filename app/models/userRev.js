/**
 * Created by Owner on 2017/2/6.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserRevSchema = new Schema({
    firstname:{type:String, lowercase:true, required: true},
    lastname: {type: String, lowercase:true, required: true},
    phone:{type: String, lowercase:true, required: true},
    email:{type: String, lowercase:true, required: true},
    date:{type: Date, lowercase:true, required: true},
    time:{type: Date, lowercase:true, required: true},
    people: {type:String, lowercase:true, required:true},
    confirmationCode:{type:String, required:true}
});


module.exports = mongoose.model('UserRev', UserRevSchema);



