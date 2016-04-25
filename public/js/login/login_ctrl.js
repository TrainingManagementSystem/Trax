app.controller('LoginControl', ['$scope', 'LoginService', 'moment', function($scope, LoginService, moment){
  // $scope.CurrentDate = new Date();
  $scope.CurrentDate = moment().format("dddd, MMMM Do");
  
  $scope.user = {};
  $scope.user.role = "trainer";
  $scope.trainer = true;
  $scope.getRole = function(role){

  	$scope.user.role = role;
  	if(role === 'trainer'){
  		$scope.trainer = true;
  		console.log('trainer');
  	}else if(role === 'trainee'){
  		$scope.trainer = false;
  		console.log('trainee');
  	}
  	console.log('role', role);
  }

  $scope.loginForm = function (){
  	LoginService.login($scope.user).then(function(res, error){
  		if(err){
  			console.log(err)
  		} else {
  			console.log(res)
  		}
  	});
  }

}]);
