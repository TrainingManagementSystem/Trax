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
      if(!$scope.trainer && !$scope.user.password) $scope.user.password = ' ';
      LoginService.login($scope.user).then(
        function( success ){
            LoginService.user = success.data;
            console.log("Logged in: ", LoginService.user);
            LoginService.updateData();
            if(LoginService.user.trainer) $state.go("client");
            else $state.go("trainer");
        },
        function( fail ){
            $scope.user.password = '';
            console.log(fail);
            alert("Login attempt failed, please try again");
        });
  };
  $scope.signupForm = function (){
      LoginService.signup($scope.newUser).then(
        function( success ){
            LoginService.user = success.data;
            $state.go("trainer");
        },
        function( fail ){
            console.log(fail);
            alert("Sign-up attempt failed, please try again...");
        });
  };

}]);
