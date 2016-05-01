// import mongoose from 'mongoose';
import Trainee from './Trainee';
import Trainer from '../trainer/Trainer';

const cb = res => (error, response) => {
        console.log('error: ', error);
        console.log('response: ', response);
        if(error) res.status(500).json(error);
        else res.status(200).json(response);
      };

export default {
  newTrainee( req, res ){
    Trainee.create(req.body, cb(res));
  },
  getTrainees( req, res ){
    Trainee.find(req.query, cb(res)).populate('trainer');
  },
  getTrainee( req, res ){
    Trainee.findById(req.params.id, cb(res)).populate('trainer');
  },
  updateTrainee( req, res ){
    Trainee.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('trainer')
    .exec(( error, updatedTrainee )=>{
            if(error) return res.status(500).json(error);
            if(req.user._id == updatedTrainee._id){
              console.log("session updated");
              req.user = updatedTrainee;
            }
            res.status(200).json(updatedTrainee);
          });
  },
  deleteTrainee( req, res ){
    Trainee.findById(req.params.id, (error, trainee)=>{
      if(error) return res.status(500).json(error);
      Trainer.findById(trainee.trainer, (error, trainer)=>{
        if(error) return res.status(500).json(error);
        trainer.trainees.splice(trainer.trainees.indexOf(trainee._id), 1);
        trainer.save((err, resp)=>{
          if(error) return res.status(500).json(error);
          console.log("Trainer Saved: ", resp);
          trainee.remove().then(
            trainee => res.status(200).json(trainee),
            error => res.status(500).json(error));
        });
      });
    });
  },
  updatePassword( req, res ){
    Trainee.findById(req.params.id, (err, trainee)=>{
      if(err) return res.status(500).json(err);
      if(req.user) req.user.password = req.body.password;
      trainee.password = req.body.password;
      trainee.save(cb(res));
    }).populate('trainer');
  }
};
