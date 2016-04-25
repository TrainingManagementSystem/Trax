app.controller('SignupControl', ['$scope', 'SignupService', 'moment' function($scope, SignupService, moment){

	$scope.CurrentDate = moment().format("dddd, MMMM Do");

	$scope.signupForm = function(){
		
	}

})