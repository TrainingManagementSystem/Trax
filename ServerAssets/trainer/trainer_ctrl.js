import mongoose from 'mongoose';
import trainer from './Trainer';

const cb = res => function (error, response) {
    if(error) res.status(500).json(error);
    else res.status(200).json(response);
};

export default {
  checkLogin(req, res){
    Trainer.findOne({
      email: req.query.email,
      password: req.query.password
    }).then(function(trainer, err){
      if(err){
        return res.status(500).send(err);
      }
      res.send(trainer);
    });
  },
  newTrainer(req, res){
    trainee.create(req.body, cb(res));
  },
  getTrainers( req, res ){
    trainer.find(req.query, cb(res)).populate('trainees');
  },
  getTrainer(req, res){
    trainer.findById(req.params.id, cb(res)).populate('trainees');
  },
  updateTrainer(req, res){
    trainer.findByIdAndUpdate(req.params.id, req.body, {new: true}, cb(res));
  },
  deleteTrainer(req, res){
    trainee.findByIdAndRemove(req.params.id, cb(res));
  }
};
