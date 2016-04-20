import mongoose from 'mongoose';
import trainee from './Trainee';

const cb = res => function (error, response) {
    if(error) res.status(500).json(error);
    else res.status(200).json(response);
};

export default {
  newTrainee( req, res ){
    trainee.create(req.body, cb(res));
  },
  getTrainees( req, res ){
    trainee.find(req.query, cb(res)).populate('trainer');
  },
  getTrainee( req, res ){
    trainee.findById(req.params.id, cb(res)).populate('trainer');
  },
  updateTrainee( req, res ){
    trainee.findByIdAndUpdate(req.params.id, req.body, {new: true}, cb(res));
  },
  deleteTrainee( req, res ){
    trainee.findByIdAndRemove(req.params.id, cb(res));
  }
};
