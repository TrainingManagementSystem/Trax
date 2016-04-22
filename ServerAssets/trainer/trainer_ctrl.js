// import mongoose from 'mongoose';
import Trainer from './Trainer';

const cb = res => function (error, response) {
        if(error) res.status(500).json(error);
        else res.status(200).json(response);
      };
      // requireAuth = (req, res, next) => {
      //   if(!req.isAuthenticated()) return res.status(403).end();
      //   return next();
      // };

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
    Trainer.findByIdAndUpdate(req.params.id, req.body, {new: true}, cb(res));
  },
  deleteTrainer( req, res ){
    Trainer.findByIdAndRemove(req.params.id, cb(res));
  }
};
///// TESTING  /////////
// console.log(`req.isAuthenticated: ${req.isAuthenticated}`);
// console.log(`req.logout: ${req.logout}`);
// console.log(`req.logOut: ${req.logOut}`);
// console.log(`req.login: ${req.login}`);
// for(let x in req){
//   console.log(`req: ${x}`);
//   for(let y in req[x])
//     console.log(`   ${x}: ${y}`);
// }
///// TESTING  /////////
