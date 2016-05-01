app.service('LoginService', function($http, $timeout, $rootScope){
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
        return $http.get("/auth/fitbit",  { headers: {"Accept-Language": "en_US"} });
    };

    //Reset trainer password
    this.resetTrainerPassword = function(newPassword){
      var url = '/api/trainer/'+ self.user._id +'/password';
      return $http.put(url, newPassword);
    };

    //Reset trainee password
    this.resetTraineePassword = function(newPassword){
      var url = '/api/trainee/'+ self.user._id +'/password';
      return $http.put(url, newPassword);
    };

    //Update Trainer Profile
    this.updateTrainer = function(){
      var url = '/api/trainer/' + self.user._id;
      return $http.put(url, self.user);
    };

    //Update Trainee Profile
    this.updateTrainee = function(){
      var url;
      if(self.user.trainer) {
        url = '/api/trainee/' + self.user._id;
        return $http.put(url, self.user);
      }
      else {
        var user = $rootScope.currentClient;
        url = '/api/trainee/' + user._id;
        return $http.put(url, user);
      }
    };

    //Logout
    this.logout = function(){
      self.user = "";
      return $http.get('/logout');
    };

    //cancel
    this.cancel = function(){
      console.log('cancel function');
      if(self.user.trainees){
        console.log('cancel trainer');
        return $http.delete('/api/trainer/' + self.user._id);
      }else{
        console.log('cancel trainee');
        return $http.delete('/api/trainee/' + self.user._id);
      }
    };

//////////////////////////  TRAINER SPECIFIC ROUTES  ///////////////////////////
    // If signup is successful, the user object will be saved to the service
    this.signup = function(newUser) {
        return $http.post("/api/trainers", newUser);
    };

    // Adds a new trainee to a trainer via the addNewTrainee modal on the navbar
    this.addNewTrainee = function(trainee) {
        return $http.post("/api/trainees", trainee);
    };

/////////////////////////////  FITBIT API CALLS  ///////////////////////////////
  ////// POST //////
    // Update daily step goal on Fitbit.com
    this.updateStepGoal = function(){
      var user = self.user.trainer ? self.user : $rootScope.currentClient,
          apiReqHeader = {
            "Authorization": "Bearer " + user.fitbit.accessToken,
            "Accept-Language": "en_US"
          },
          id = user.fitbit.id,
          goal = Math.floor(user.fitbit.steps.goal),
          url = "https://api.fitbit.com/1/user/"+id+"/activities/goals/daily.json"+
                "?steps="+goal;

      console.log("submitting POST req to URL: ", url);
      $http.post(url, {/* Req.body */}, { headers: apiReqHeader }).then(
        function(success){console.log("Successfully posted to Fitbit", success);},
        function(failure){console.log("Failed to post to Fitbit", failure);}
      );
    };
    // Update daily calories intake goal on Fitbit.com
    this.updateCalGoal = function(){
      var user = self.user.trainer ? self.user : $rootScope.currentClient,
          apiReqHeader = {
            "Authorization": "Bearer " + user.fitbit.accessToken,
            "Accept-Language": "en_US"
          },
          id = user.fitbit.id;
          console.log("user test: ", user);
          var goal = Math.floor(user.fitbit.nutrition.goals.calories),
          url = "https://api.fitbit.com/1/user/"+id+"/foods/log/goal.json"+
                "?calories="+goal;

      console.log("submitting POST req to URL: ", url);
      $http.post(url, {/* Req.body */}, { headers: apiReqHeader }).then(
        function(success){console.log("Successfully posted to Fitbit", success);},
        function(failure){console.log("Failed to post to Fitbit", failure);}
      );
    };
    
  ////// GET //////
    this.updateData = function() {
      // Run function only if the user has an attached Fitbit account
      if(self.user.fitbit.authorized){
        var refreshTokenUrl = "https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token="+self.user.fitbit.refreshToken,
            refreshTokenHeader = {
              "Authorization":    "Basic " + window.btoa("227Q97:8823c6632233f540fb78fcdcecb6637b"), // <client_id>:<client_secret> (encoded in Base64 format)
              "Content-Type":     "application/x-www-form-urlencoded",
              "Accept-Language": "en_US"
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
                    "Accept-Language": "en_US"
                  },
                  today = moment().format('YYYY-MM-DD');
              // GET updated profile
              $http.get(apiReqUrl+"/profile.json", { headers: apiReqHeader } ).then(
                function( profile ){
                    console.log("Aquired profile: ", profile.data);
                    self.user.fitbit.user = profile.data.user;
                },
                function( error ){
                    console.log("Failed to aquire profile: ", error.data);
                });
              // GET daily activity information (today's steps, today's step goal)
              $http.get(apiReqUrl+"/activities/date/"+today+".json", { headers: apiReqHeader } ).then(
                function( steps ){
                    console.log("Aquired steps activity: ", steps.data);
                    self.user.fitbit.steps = self.user.fitbit.steps || {};
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
                    self.user.fitbit.stepLog = stepLog.data["activities-steps"];
                },
                function( error ){
                    console.log("Failed to aquire step log: ", error.data);
                });
              // GET lifetime activity information (lifetime steps)
              $http.get(apiReqUrl+"/activities.json", { headers: apiReqHeader } ).then(
                function( lifetime ){
                    console.log("Aquired lifetime activity data: ", lifetime.data);
                    self.user.fitbit.steps = self.user.fitbit.steps || {};
                    self.user.fitbit.steps.lifetime = lifetime.data.lifetime.total.steps;
                },
                function( error ){
                    console.log("Failed to aquire lifetime activity data: ", error.data);
                });
              // GET nutrition data (daily calorie intake and goal)
              $http.get(apiReqUrl+"/foods/log/date/"+today+".json", { headers: apiReqHeader } ).then(
                function( nutrition ){
                    console.log("Aquired nutrition data: ", nutrition.data);
                    self.user.fitbit.nutrition = self.user.fitbit.nutrition || {};
                    self.user.fitbit.nutrition.daily = nutrition.data.summary;
                    self.user.fitbit.nutrition.goals = nutrition.data.goals || self.user.fitbit.nutrition.goals;
                },
                function( error ){
                    console.log("Failed to aquire nutrition data: ", error.data);
                });
              // GET body measurements
              $http.get(apiReqUrl+"/body/date/"+today+".json", { headers: apiReqHeader } ).then(
                function( measurement ){
                    console.log("Aquired measurement data: ", measurement.data.body);
                    self.user.fitbit.bodyMeasurements = measurement.data.body;
                },
                function( error ){
                    console.log("Failed to aquire measurement goals: ", error.data);
                });

              // If this is the first data pull, save the starting values
              if(self.user.starting.weight === 0)
                 self.user.starting.weight = self.user.fitbit.bodyMeasurements.weight || 0;
              if(self.user.starting.fat === 0)
                 self.user.starting.fat = self.user.fitbit.bodyMeasurements.fat || 0;
              if(self.user.starting.bmi === 0)
                 self.user.starting.bmi = self.user.fitbit.bodyMeasurements.bmi || 0;
              if(self.user.starting.steps === 0)
                 self.user.starting.steps = self.user.fitbit.steps.lifetime || 0;
              // If this is the first data pull, set the initial measurements values
              var measure = self.user.bodyMeasurements;
              if(measure.neck)
                 measure.neck = self.user.fitbit.bodyMeasurements.neck || 0;
              if(measure.chest)
                 measure.chest = self.user.fitbit.bodyMeasurements.chest || 0;
              if(measure.waist)
                 measure.waist = self.user.fitbit.bodyMeasurements.waist || 0;
              if(measure.hips)
                 measure.hips = self.user.fitbit.bodyMeasurements.hips || 0;
              if(measure.thigh)
                 measure.thigh = self.user.fitbit.bodyMeasurements.thigh || 0;
              if(measure.calf)
                 measure.calf = self.user.fitbit.bodyMeasurements.calf || 0;
              if(measure.bicep)
                 measure.bicep = self.user.fitbit.bodyMeasurements.bicep || 0;
              if(measure.forearm)
                 measure.forearm = self.user.fitbit.bodyMeasurements.forearm || 0;

              // Wait 5 seconds (giving time for the promises to resolve) and then save User
              $timeout(function(){
                  console.log("inside the timeout: ", self.user);
                  var role = self.user.trainer ? "trainee/" : "trainer/";
                  $http.put("/api/"+role+self.user._id, self.user).then(
                      function(response){console.log("User saved: ", response);},
                      function(error){console.log("Failed to save user: ", error);});},
              5000);
              console.log("after the timeout");
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
