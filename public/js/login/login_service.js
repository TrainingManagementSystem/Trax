app.service('LoginService', function($http){

	this.login = function(user) {
		return $http.post("/login", user);
	};

});
