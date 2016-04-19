var mongoose = require('mongoose');

var Trainer = new mongoose.Schema({
  firstName: {type:String, required: true},
  lastName: {type:String, required: true},
  email: {type:String, required: true, unique: true, index: true},
  password: {type: String, required:true},
  phone: {type: String, required:true, index:true},
  trainees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Trainee'}]
});

module.exports = Trainer;
