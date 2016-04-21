import mongoose from 'mongoose';

const Trainer = new mongoose.Schema({
  firstName: {type:String, required: true},
  lastName: {type:String, required: true},
  email: {type:String, required: true, unique: true},
  password: {type: String, required:true},
  phone: {type: String, required:true, index:true},
  trainees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Trainee'}]
});

export default mongoose.model('Trainer', Trainer);
