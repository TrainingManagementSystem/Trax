var mongoose = require('mongoose'),
    Data = new mongoose.Schema({
      // // Build you Scheme here
      // title: {type: String, required: true, unique: true, index: true},
      // description: {type: String, required: true, default: 'Description...'},
      // price: {type: Number, require: true, min: 0}
    });

module.exports = mongoose.model('Data', Data);
