// import mongoose from 'mongoose';
import Trainer from './Trainer';

const cb = res => function (error, response) {
        console.log('error: ', error);
        console.log('response: ', response);
        if(error) res.status(500).json(error);
        else res.status(200).json(response);
      };

export default {
  newTrainer( req, res ){
    Trainer.create(req.body, cb(res));
  },
  getTrainers( req, res ){
    Trainer.find(req.query, cb(res)).populate('trainees');
  },
  getTrainer( req, res ){
    Trainer.findById(req.params.id, cb(res)).populate('trainees');
  },
  updateTrainer( req, res ){
    Trainer.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('trainees').exec(cb(res));
  },
  deleteTrainer( req, res ){
    Trainer.findByIdAndRemove(req.params.id, cb(res));
  },
  updatePassword( req, res ){
    Trainer.findById(req.params.id, function( err, trainer ){
      if(err) res.status(500).json(error);
      trainer.password = req.body.password;
      trainer.save(cb(res));
    }).populate('trainees');
  }
};
