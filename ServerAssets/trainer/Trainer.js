import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Trainer = new mongoose.Schema({
      firstName: {type: String, required: true},
      lastName: {type: String, required: true},
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true},
      phone: {type: String, unique: true},
      trainees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Trainee'}],
      fitbit: {
        authorized: {type: Boolean, default: false},
        accessToken: String,
        refreshToken: String,
        provider: String, // "fitbit"
        id: String, // "4HN4XH",
        displayName: String, // "Liz",
        user: {
          age: Number, // 24,
          avatar: String, // "https://static0.fitbit.com/images/profile/defaultProfile_100_female.gif",
          avatar150: String, // "https://static0.fitbit.com/images/profile/defaultProfile_150_female.gif",
          averageDailySteps: Number, // 0,
          corporate: Boolean, // false,
          country: String, // "US",
          dateOfBirth: String, // "1991-06-19",
          displayName: String, // "Liz",
          distanceUnit: String, // "en_US",
          encodedId: String, // "4HN4XH",
          features: {
            exerciseGoal: Boolean // true
          },
          foodsLocale: String, // "en_US",
          fullName: String, // "Liz Bryson",
          gender: String, // "FEMALE",
          glucoseUnit: String, // "en_US",
          height: Number, // 175.3,
          heightUnit: String, // "en_US",
          locale: String, // "en_US",
          memberSince: String, // "2016-04-15",
          offsetFromUTCMillis: Number, // -18000000,
          startDayOfWeek: String, // "SUNDAY",
          strideLengthRunning: Number, // 93.4,
          strideLengthRunningType: String, // "default",
          strideLengthWalking: Number, // 72.4,
          strideLengthWalkingType: String, // "default",
          timezone: String, // "America/Chicago",
          topBadges: [],
          waterUnit: String, // "en_US",
          waterUnitName: String, // "fl oz",
          weight: Number, // 65.7,
          weightUnit: String, // "en_US"
        }
      }
});

///////////bcrypt/////////////
Trainer.methods.generateHash = function( password ) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

Trainer.methods.validatePassword = function( password ) {
	return bcrypt.compareSync(password, this.password);
};


/////////////saves hashed pw, not real pw///////////////
Trainer.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')) return next();
  user.password = Trainer.methods.generateHash(user.password);
  next();
});

export default mongoose.model('Trainer', Trainer);
