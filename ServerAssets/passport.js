import { FitbitOAuth2Strategy as FitbitStrategy} from 'passport-fitbit-oauth2';
import fitbit from '../config/fitbit';
import trainer from './trainer/Trainer';
import trainee from './trainee/Trainee';

export default function (passport) {

  /// START OF EXPORT ///
passport.use(new FitbitStrategy(fitbit,
  function(req, accessToken, refreshToken, profile, done) {

    console.log(`Req: ${req}`);
    console.log(`accessToken: ${accessToken}`);
    console.log(`refreshToken: ${refreshToken}`);
    console.log(`profile: ${profile}`);
    if(req.query.role === 'trainee') {
      trainee.findOne({ fitbitId: profile.id }, function (err, user) {
        console.log(`err: ${err}, user: ${user}`);
        if(err || user) return done(err, user);
        // let newTrainee = new trainee();
      });
    }
    if(req.query.role === 'trainer') {
      trainer.findOne({ fitbitId: profile.id }, function (err, user) {
        console.log(`err: ${err}, user: ${user}`);
        if(err || user) return done(err, user);
        // let newTrainee = new trainee();
      });
    }
    return done(null, false);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
  ///// END OF EXPORT /////

}
