import trainee from './trainee/trainee_routes';
import trainer from './trainer/trainer_routes';
import passport from 'passport';

export default function (app) {
  /// START OF EXPORT ///

  /// USER ROUTES ///
  trainee(app);
  trainer(app);

  ///// PASSPORT ROUTES /////
  // FITBIT : AUTHORIZE //
  // sends user to Fitbit for authorization
  app.get('/auth/fitbit',
    passport.authenticate('fitbit',
    { scope: ['activity','heartrate','location','nutrition','profile','settings','sleep','social','weight']
    })
  );
  // Location Fitbit sends the user to after authorization
  app.get('/auth/fitbit/callback',
    passport.authenticate( 'fitbit',
    { successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  /// LOCAL : LOGIN ///
  app.post('/login',
    passport.authenticate('local',
    { successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  );
  /// LOCAL : LOGOUT ///
  app.get('/logout',
   function(req, res) {
     req.logout();
     res.redirect('/');
  });

  ///// END OF EXPORT /////
}
