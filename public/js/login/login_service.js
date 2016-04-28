app.service('LoginService', function($http, $timeout){
    var self = this;
    // If Login is successful, the user object will be saved to the service
    this.login = function(user) {
        return $http.post("/login", user);
    };

    // if the service is destroyed via an app reload, recheck the backend for a valid session
    this.checkIfLogged = function() {
        return $http.get("/loggedIn");
    };

    // Authenticate the fitbit account
    this.authFitbit = function(){
        return $http.get("/auth/fitbit");
    };

//////////////////////////  TRAINER SPECIFIC ROUTES  ///////////////////////////
    // If signup is successful, the user object will be saved to the service
    this.signup = function(newUser) {
        return $http.post("/api/trainers", newUser);
    };

    // Adds a new trainee to a trainer via the addNewTrainee modal on the navbar
    this.addNewTrainee = function(trainee) {
        console.log("inside the service: ", trainee);
        return $http.post("/api/trainees", trainee);
    };

    // Updates a trainer after changes have been made
    this.updateTrainer = function() {
        var url = "/api/trainer/" + self.user._id;
        return $http.put(url, self.user);
    };


/////////////////////////////  FITBIT API CALLS  ///////////////////////////////
    this.updateData = function() {
      // Run function only if the user has an attached Fitbit account
      if(self.user.fitbit.authorized){
        var refreshTokenUrl = "https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token="+self.user.fitbit.refreshToken,
            refreshTokenHeader = {
              "Authorization":    "Basic " + window.btoa("227Q97:8823c6632233f540fb78fcdcecb6637b"), // <client_id>:<client_secret> (encoded in Base64 format)
              "Content-Type":     "application/x-www-form-urlencoded",
              "Content-Language": "en-US"
            };

        // REFRESH THE FITBIT ACCESS TOKEN
        $http.post(refreshTokenUrl, {/* Req.body */}, { headers: refreshTokenHeader }).then(
          // THEN: If accessToken successfully renewed...
          function(response){
              console.log("accessToken renewed", response.data);
              self.user.fitbit.accessToken = response.data.access_token;
              self.user.fitbit.refreshToken = response.data.refresh_token;
              var apiReqUrl = "https://api.fitbit.com/1/user/"+self.user.fitbit.id,
                  apiReqHeader = {
                    "Authorization": "Bearer " + self.user.fitbit.accessToken,
                    "Accept-Language": "en-US"
                  },
                  today = moment().format('YYYY-MM-DD');
              // GET updated profile
              $http.get(apiReqUrl+"/profile.json", { headers: apiReqHeader } ).then(
                function( profile ){
                    console.log("Aquired profile: ", profile.data);
                    self.user.fitbit.user = profile.data;
                },
                function( error ){
                    console.log("Failed to aquire profile: ", error.data);
                });
              // GET daily activity information (today's steps, today's step goal)
              $http.get(apiReqUrl+"/activities/date/"+today+".json", { headers: apiReqHeader } ).then(
                function( steps ){
                    console.log("Aquired steps activity: ", steps.data);
                    self.user.fitbit.steps.daily = steps.data.summary.steps;
                    self.user.fitbit.steps.goal = steps.data.goals.steps;
                },
                function( error ){
                    console.log("Failed to aquire daily activity: ", error.data);
                });
              // GET 7-day activity log (steps)
              $http.get(apiReqUrl+"/activities/steps/date/today/1w.json", { headers: apiReqHeader } ).then(
                function( stepLog ){
                    console.log("Aquired step log: ", stepLog.data);
                    self.user.fitbit.stepLog = stepLog.data["activities-log-step"];
                },
                function( error ){
                    console.log("Failed to aquire step log: ", error.data);
                });
              // GET lifetime activity information (lifetime steps)
              $http.get(apiReqUrl+"/activities.json", { headers: apiReqHeader } ).then(
                function( lifetime ){
                    console.log("Aquired lifetime activity data: ", lifetime.data);
                    self.user.fitbit.steps.lifetime = lifetime.data.lifetime.total.steps;
                },
                function( error ){
                    console.log("Failed to aquire lifetime activity data: ", error.data);
                });
              // GET nutrition data (daily calorie intake and goal)
              $http.get(apiReqUrl+"/foods/log/date/"+today+".json", { headers: apiReqHeader } ).then(
                function( nutrition ){
                    console.log("Aquired nutrition data: ", nutrition.data);
                    self.user.fitbit.nutrition.goals = nutrition.data.goals.calories;
                    self.user.fitbit.nutrition.daily.calories = nutrition.data.summary.calories;
                    self.user.fitbit.nutrition.daily.carbs = nutrition.data.summary.carbs;
                    self.user.fitbit.nutrition.daily.fat = nutrition.data.summary.fat;
                    self.user.fitbit.nutrition.daily.fiber = nutrition.data.summary.fiber;
                    self.user.fitbit.nutrition.daily.protein = nutrition.data.summary.protein;
                    self.user.fitbit.nutrition.daily.sodium = nutrition.data.summary.sodium;
                    self.user.fitbit.nutrition.daily.water = nutrition.data.summary.water;
                },
                function( error ){
                    console.log("Failed to aquire nutrition data: ", error.data);
                });
              // GET body measurements
              $http.get(apiReqUrl+"/body/date/"+today+".json", { headers: apiReqHeader } ).then(
                function( measurement ){
                    console.log("Aquired measurement data: ", measurement.data);
                    self.user.fitbit.bodyMeasurements = measurement.data;
                },
                function( error ){
                    console.log("Failed to aquire measurement goals: ", error.data);
                });
              // Wait 15 seconds (giving time for the promises to resolve) and then save User
              $timeout($http.put("/api/trainer/"+self.user._id, self.user).then(
                function(response){console.log("User saved: ", response);},
                function(error){console.log("Failed to save user: ", error);}),
                15000);
          },
          // OR: If accessToken fails to renew...
          function(error){
              console.log("Failed to renew accessToken... ", error.data);
          }
        );
      }
      else console.log("You must first authorize Fitbit before data can be retrieved");
    };

});
