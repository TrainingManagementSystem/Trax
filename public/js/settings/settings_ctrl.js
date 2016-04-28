var app = angular.module('traxApp');
app.controller('settings_ctrl', function($scope, $rootScope, LoginService, $state, $uibModal){

  //////////////////////// AUTHORIZATION CONTROLS ////////////////////////////////
  // Check for valid login session and assign logged in user to scope //////////
  if(!LoginService.user){
    LoginService.checkIfLogged().then(function( res, err ){
      if(res.data === "error") return $state.go("login");
      $scope.user = LoginService.user = res.data;
      $scope.displayHeight = getHeight($scope.user.fitbit.user.height);
    });
  } else {
    $scope.user = LoginService.user;
    $scope.displayHeight = getHeight($scope.user.fitbit.user.height);
  }
  function getHeight(height){
    var feet = Math.floor(height/12),
        inches = Math.floor(height%12);
    return feet + "\'" + inches + "\"";
  }
  $scope.authFitbit = function(){
    LoginService.authFitbit().then(function( res, err ){
      console.log('inside the .then...');
      if(res.data === "error") console.log("Authorization attempt failed");
      else {console.log("inside the 'else' statement"); $scope.user = LoginService.user = res.data;}
    });
  };
////////////////////////////////////////////////////////////////////////////////


  $rootScope.currentState = 'settings';
  $scope.editingBilling = false;
  $scope.editBilling = function(){
    $scope.editingBilling = !$scope.editingBilling;
  }

  $scope.editingProfile = false;
  $scope.editProfile = function(){
    if($scope.editingProfile === true){
      if($scope.user.trainees){
        LoginService.updateTrainer()
      }else{
        LoginService.updateTrainee();
      }
    }
    $scope.editingProfile = !$scope.editingProfile;
  }

  $scope.openResetPassword = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/js/modal/resetPasswordModal.html',
      controller: 'resetPasswordModal',
      size: size,
      resolve: {
        client: function () {
          return $scope.user;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };
});
