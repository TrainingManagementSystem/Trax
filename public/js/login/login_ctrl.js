app.controller('LoginControl', ['$scope', '$state', 'LoginService', 'moment', function($scope, $state, LoginService, moment){
  // $scope.CurrentDate = new Date();
  $scope.CurrentDate = moment().format("dddd, MMMM Do");

  // Controls the buttons that switch between trainer and trainee on the login page
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
  };

  //////// END POINTS ////////
  $scope.loginForm = function (){
      // if(!$scope.trainer && !$scope.user.password) $scope.user.password = ' ';
      LoginService.login($scope.user).then(function( res, err ){
        if(res.data === "error") return console.log("Login attempt failed, please try again");
        LoginService.user = res.data;
        if(LoginService.user.trainer) $state.go("client");
        else $state.go("trainer");
      });
  };
  $scope.signupForm = function (){
      LoginService.signup($scope.newUser).then(function( res, err ){
        if(err) return console.log("Sign-up attempt failed, please try again...\n", err);
        LoginService.user = res.data;
        $state.go("trainer");
      });
  };

}]);
