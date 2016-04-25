app.service('LoginService', function($http){

    // If Login is successful, the user object will be saved to the service
    this.login = function(user, service) {
        return $http.post("/login", user);
    };

    // if the service is destroyed via an app reload, recheck the backend for a valid session
    this.checkIfLogged = function(service) {
        return $http.get("/loggedIn");
    };

    this.authFitbit = function(){
        console.log("start of service");
        return $http.get("/auth/fitbit");
    };

});
