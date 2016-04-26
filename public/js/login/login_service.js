app.service('LoginService', function($http){

    // If Login is successful, the user object will be saved to the service
    this.login = function(user) {
        return $http.post("/login", user);
    };

    // If Login is successful, the user object will be saved to the service
    this.signup = function(newUser) {
        console.log("inside the service, before the $http request");
        return $http.post("/api/trainers", newUser);
    };

    // if the service is destroyed via an app reload, recheck the backend for a valid session
    this.checkIfLogged = function() {
        return $http.get("/loggedIn");
    };

    this.authFitbit = function(){
        console.log("start of service");
        return $http.get("/auth/fitbit");
    };

});
