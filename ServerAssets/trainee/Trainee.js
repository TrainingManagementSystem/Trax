import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { secret } from '../../config/session';

const Trainee = new mongoose.Schema({
      firstName: {type: String, required: true},
      lastName: {type: String, required: true},
      email: {type: String, required: true, lowercase: true, unique: true},
      password: {type: String, default: secret},
      phone: String,
      trainer: {type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true},
      active: {type: Boolean, default: true},
      schedule: [{
        dayOfWeek: Number,
        time: String,
        location: String
      }],
      measurements: {
        neck: Number,
        waist: Number,
        thigh: Number,
        bicep: Number,
        forearm: Number,
        shoulders: Number,
        calf: Number,
        chest: Number
      },
      starting: {
        weight: Number,
        bf: Number,
        bmi: Number,
        steps: Number
      },
      fitbit: {
        authorized: {type: Boolean, default: false},
        accessToken: String,
        refreshToken: String,
        provider: String, // "fitbit"
        id: String, // "4HN4XH",
        displayName: String, // "Liz",
        steps: {
          daily: Number,
          goal: Number,
          lifetime: Number
        },
        stepLog: [{
          dateTime: String,
          value: Number
        }],
        nutrition: {
          daily: {
            calories: Number,
            carbs: Number,
            fat: Number,
            fiber: Number,
            protein: Number,
            sodium: Number,
            water: Number
          },
          goals: {
            calories: Number,
            estimatedCaloriesOut: Number
          }
        },
        bodyMeasurements: {
          weight: Number,
          bmi: Number,
          fat: Number
        },
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
Trainee.methods.generateHash = function( password ) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

Trainee.methods.validatePassword = function( password ) {
	return bcrypt.compareSync(password, this.password);
};


/////////////saves hashed pw, not real pw///////////////
Trainee.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')) return next();
  user.password = Trainee.methods.generateHash(user.password);
  next();
});

export default mongoose.model('Trainee', Trainee);
