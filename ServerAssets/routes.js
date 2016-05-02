import TraineeRoutes from './trainee/trainee_routes';
import TrainerRoutes from './trainer/trainer_routes';
import Trainee from './trainee/Trainee';
import Trainer from './trainer/Trainer';
import passport from 'passport';

export default function (app) {
  /// START OF EXPORT ///

  /// USER ROUTES ///
  TraineeRoutes(app);
  TrainerRoutes(app);

  ///// PASSPORT ROUTES /////
  /// LOCAL : LOGIN ///
  app.post('/login', passport.authenticate('local',
    { successRedirect: '/loggedIn',
      failureRedirect: '/logInFail' }
  ));
  /// LOCAL : If Local Auth SUCCEEDS ///
  app.get('/loggedIn',
   function(req, res) {
     if(!req.user) return res.status(401).json('error');
     if(req.user.trainer) Trainee.findById(req.user._id, (err, trainee)=>{
       if(err) return res.status(500).json(error);
       else res.status(200).json(trainee);
     }).populate('trainer');
     else Trainer.findById(req.user._id, (err, trainer)=>{
       if(err) return res.status(500).json(error);
       else res.status(200).json(trainer);
     }).populate('trainees');
  });
  /// LOCAL : If Local Auth FAILS ///
  app.get('/logInFail',
   function(req, res) {
     res.status(401).json('Invalid Login Attempt');
  });
  /// LOCAL : LOGOUT ///
  app.get('/logout',
  function(req, res) {
    req.logout();
    res.json('Logged out');
  });

  // FITBIT : AUTHORIZE //
  // sends user to Fitbit for authorization
  app.get('/auth/fitbit',
    passport.authenticate('fitbit',
    { scope: ['activity','heartrate','location','nutrition','profile','settings','sleep','social','weight']
    })
  );
  // Location Fitbit sends the user to after authorization
  app.get('/auth/fitbit/callback',
    passport.authenticate('fitbit',
    { successRedirect: '/#/client',
      failureRedirect: '/#/client'
    })
  );

  ///// END OF EXPORT /////
}
