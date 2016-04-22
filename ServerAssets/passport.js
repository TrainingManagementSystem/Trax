import { FitbitOAuth2Strategy as FitbitStrategy} from 'passport-fitbit-oauth2';
import { Strategy as LocalStrategy} from 'passport-local';
import fitbit from '../config/fitbit';
import Trainer from './trainer/Trainer';
import Trainee from './trainee/Trainee';

export default function (passport) {
  /// START OF EXPORT ///

////////--- LOCAL AUTH ---///////////
passport.use(new LocalStrategy(
  { usernameField: 'email'},
  function(username, password, done) {
    Trainer.findOne({ email: username }, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

////////--- OAUTH w/ FITBIT ---///////////
passport.use(new FitbitStrategy(fitbit,
  function(req, accessToken, refreshToken, profile, done) {
    Trainee.findOne({ fitbitId: profile.id }, function (err, user) {
        if( err || user ) return done(err, user);
        // var newTrainee = new trainee();
        // newUser.fitbitId = profile.id;
        // newUser.name = profile.displayName;
        // newUser.save(function(err){
        //     if(err) {
        //         // throw err;
        //     }
        //     return cb(err, newUser);
        // });
        // console.log(user);
    });
  }
));

///// -- Serialization -- /////
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

  ///// END OF EXPORT /////
}
