// import mongoose from 'mongoose';
import Trainee from './Trainee';
import Trainer from '../trainer/Trainer';

const cb = res => function (error, response) {
        console.log('error: ', error);
        console.log('response: ', response);
        if(error) res.status(500).json(error);
        else res.status(200).json(response);
      };

export default {
  newTrainee( req, res ){
    console.log("inside the backend: ", req.body);
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
    .exec(function (error, updatedTrainee) {
            if(error) return res.status(500).json(error);
            if(req.user._id == updatedTrainee._id){
              console.log("session updated");
              req.user = updatedTrainee;
            }
            res.status(200).json(updatedTrainee);
          });
  },
  deleteTrainee( req, res ){
    // Trainee.findById(req.params.id, function( err, trainee ){
    //   if(err) return res.status(500).json(err);
    //   if(req.user) req.user.password = req.body.password;
    //   trainee.password = req.body.password;
    //   trainee.save(cb(res));
    // }).populate('trainer');
  },
  updatePassword( req, res ){
    Trainee.findById(req.params.id, function( err, trainee ){
      if(err) res.status(500).json(err);
      if(req.user) req.user.password = req.body.password;
      trainee.password = req.body.password;
      trainee.save(cb(res));
    }).populate('trainer');
  }
};
