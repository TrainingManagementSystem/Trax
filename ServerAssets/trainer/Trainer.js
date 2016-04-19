var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Trainer = new mongoose.Schema({
  name: {type:String, required: true},
  email: {type:String, required: true, unique: true, index: true},
  password: {type: String, required:true},
  stuCode: {type: String, required:true, index:true},
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]
});

Trainer.plugin(deepPopulate);

module.exports = Trainer;
