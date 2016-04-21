import trainee from './trainee/trainee_routes';
import trainer from './trainer/trainer_routes';
import passport from 'passport';

export default function (app) {
  /// START OF EXPORT ///

  /// USER ROUTES ///
  trainee(app);
  trainer(app);

  ///// PASSPORT ROUTES /////
  // PASSPORT : LOGIN //
  // sends user to Fitbit for authentication
  app.get('/auth/fitbit', passport.authenticate('fitbit', {
      scope: ['activity','heartrate','location','nutrition','profile','settings','sleep','social','weight']
  }));
  // Location Fitbit sends the user to after authentication
  app.get('/auth/fitbit/callback', passport.authenticate( 'fitbit', {
      failureRedirect: '/login'
      }),
      // Successful authentication
      function(req, res) {
      res.redirect('/client');
  });

  // PASSPORT : LOGOUT //
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  ///// END OF EXPORT /////
}
