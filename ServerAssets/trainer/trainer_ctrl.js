// import mongoose from 'mongoose';
import Trainer from './Trainer';
import Trainee from '../trainee/Trainee';

const cb = res => (error, response) => {
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
    Trainer.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('trainees')
    .exec((error, updatedTrainer)=>{
            if(error) return res.status(500).json(error);
            req.user = updatedTrainer;
            res.status(200).json(updatedTrainer);
          });
  },
  deleteTrainer( req, res ){
    Trainer.findById(req.params.id, (err, trainer)=>{
      if(err) return res.status(500).json(error);
      Trainee.remove({_id: {$in: trainer.trainees}}, error => console.log(error));
      trainer.remove().then(
        result => res.status(200).json(result),
        error => res.status(500).json(error));
    });
  },
  updatePassword( req, res ){
    Trainer.findById(req.params.id, (err, trainer)=>{
      if(err) return res.status(500).json(error);
      if(req.user) req.user.password = req.body.password;
      trainer.password = req.body.password;
      trainer.save(cb(res));
    }).populate('trainees');
  }
};
