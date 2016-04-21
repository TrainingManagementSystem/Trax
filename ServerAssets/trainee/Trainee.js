import mongoose from 'mongoose';

const Trainee = new mongoose.Schema({
      firstName: {type:String, required: true},
      lastName: {type:String, required: true},
      email: {type:String, required: true, unique: true},
      password: {type: String, required:true},
      phone: {type: String, required:true, index:true},
      trainer: {type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true},
      shareWithTrainer: {type: Boolean, default: false},
      active: {type: Boolean, default: true},
      schedule: [{
        lastInstance: String,
        dayOfWeek: Number,
        confirmed: Boolean,
        time: Number,
        location: String,
        Duration: Number
      }],
      measurements: {
        neck: Number,
        waist: Number,
        thigh: Number,
        bicep: Number,
        forearm: Number,
        shoulders: Number,
        calf: Number,
        chest: Number
      },
      goals: {
        calories: Number,
        steps: Number
      },
      fitBitToken: String,
      fitBitData: []
    });

export default mongoose.model('Trainee', Trainee);
