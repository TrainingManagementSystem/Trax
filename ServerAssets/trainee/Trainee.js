var mongoose = require('mongoose'),
    Trainee = new mongoose.Schema({
      firstName: {type:String, required: true},
      lastName: {type:String, required: true},
      email: {type:String, required: true, unique: true, index: true},
      password: {type: String, required:true},
      trainer: {type: mongoose.Schema.Types.ObjectId, ref: 'Trainer'},
      active: {type: Boolean, default: true},
      schedule: {type: Array},
      measurements: {type: Object},
      goals: {type: Object},
      fitBitToken: {type: String},
      fitBitData: {type: Array}
    });

module.exports = mongoose.model('Trainee', Trainee);
