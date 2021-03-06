import { FitbitOAuth2Strategy as FitbitStrategy} from 'passport-fitbit-oauth2';
import { Strategy as LocalStrategy} from 'passport-local';
import { secret } from '../config/session';
import fitbit from '../config/fitbit';
import Trainer from './trainer/Trainer';
import Trainee from './trainee/Trainee';


export default function (passport) {
  /// START OF EXPORT ///

////////--- LOCAL AUTH ---///////////
passport.use(new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  function(req, email, password, done) {
    if (req.body.role === 'trainer') {
      Trainer.findOne({ email: email }, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect Email.' });
        if (!user.validatePassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      }).populate('trainees');
    }
    else if (req.body.role === 'trainee') {
      Trainee.findOne({ email: email }, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect Email.' });
        if (user.validatePassword(password) || user.password === secret) {
          return done(null, user);
        }
        return done(null, false, { message: 'Incorrect password.' });
      }).populate('trainer');
    }
    else return done(null, false, { message: 'How did you even get here?' });
  }
));

////////--- OAUTH w/ FITBIT ---///////////
passport.use(new FitbitStrategy(fitbit,
  function(req, accessToken, refreshToken, profile, done) {
    if(req.user){
      console.log(req.user);
      let fitbit = {
        authorized: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        provider: 'fitbit',
        id: profile.id,
        displayName: profile.displayName,
        user: profile._json.user
      };
      if(req.user.trainer) {
        Trainee.findById(req.user._id, (err, trainee)=>{
          if(err) return done(err);
          trainee.fitbit = fitbit;
          trainee.save(function(err, user){
              if(err) return done(err);
              else return done(null, user);
          });
        });
      }
      else {
        Trainer.findById(req.user._id, (err, trainer)=>{
          if(err) return done(err);
          trainer.fitbit = fitbit;
          trainer.save(function(err, user){
              if(err) return done(err);
              else return done(null, user);
          });
        });
      }
    }
    else done(null, false, { message: 'Please log in first.' });
    // else {
    //   // Add fitbit authentication for peeps who forgot their password
    // }
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
