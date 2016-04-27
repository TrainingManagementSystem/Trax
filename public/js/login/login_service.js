app.service('LoginService', function($http){
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

});
