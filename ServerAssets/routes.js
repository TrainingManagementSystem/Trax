import trainee from './trainee/trainee_routes';
import trainer from './trainer/trainer_routes';
import passport from 'passport';

export default function (app) {
  /// START OF EXPORT ///

  /// USER ROUTES ///
  trainee(app);
  trainer(app);

  ///// PASSPORT ROUTES /////
  /// LOCAL : LOGIN ///
  app.post('/login', passport.authenticate('local',
    { successRedirect: '/loggedIn',
      failureRedirect: '/logInFail' }
  ));
  /// LOCAL : If Local Auth SUCCEEDS ///
  app.get('/loggedIn',
   function(req, res) {
     if(req.user) res.status(200).json(req.user);
     else res.status(401).json('error');
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
