var mongoose = require('mongoose');
var Trainer = mongoose.model('Trainer', require('./Trainer'));

module.exports = {
  checkLogin: function(req, res){
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
  newTrainer: function(req, res){
    console.log(req.body);
    new Teacher(req.body).save(function(err, trainer){
      if(err){
        return res.status(401).send(err);
      }
      res.send(trainer);
    });
  },
  getTrainer: function(req, res){
    Trainer.findOne({
      // stuCode: req.query.stuCode
    }).populate('trainees').exec(function(error, response) {
        console.log(222, response);
        if(error){
          return res.status(500).send(err);
        }
        res.send(response);
      });
  },
  addTrainee: function(req, res){
    Trainer.findOne({stuCode:req.query.stuCode}, function(err, trainer){
      if ( err ) return res.status(500).send(err);
      var currentList = trainer.students;
      currentList.push(req.query.sid);
      trainer.set(trainer.trainees, currentList);
      trainer.save( function( err, updatedTrainer){
        if ( err ) return res.status(500).send(err);
        return res.send(updatedTrainer);
      });
    });
  },
  removeTrainee: function(req, res){
    Trainer.findOne({stuCode:req.query.stuCode}, function(err, trainer){
      if ( err ) return res.status(500).send(err);
      var currentList = trainer.trainees;
      if(currentList.indexOf(req.query.sid) > -1){
        currentList.splice(currentList.indexOf(req.query.sid), 1);
      }
      trainer.set(trainer.trainees, currentList);
      trainer.save( function( err, updatedTrainer){
        if ( err ) return res.status(500).send(err);
        return res.send(updatedTrainer);
      });
    });
  }
};
