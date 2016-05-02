var app = angular.module('traxApp');
app.controller('client_ctrl', function($scope, $rootScope, $state, LoginService, $uibModal, moment){
  $rootScope.currentState = 'clientList';

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

  $scope.formatDate = function(date){
    return moment(date, 'YYYY-MM-DD').format('MMMM DD').toUpperCase();
  };


////////////////////////////  ESTABLISH USER  //////////////////////////////////
  // Check for valid login session and assign logged in user to scope //////////
  $scope.user = LoginService.user;
  if(LoginService.user && LoginService.user.trainer) $scope.currentClient = LoginService.user;
  else if(!$rootScope.currentClient) $state.go('clientList');
  else $scope.currentClient = $rootScope.currentClient;

  if($scope.currentClient){
    $scope.displayHeight = getHeight($scope.currentClient.fitbit.user.height);
    if($scope.user.password === "$2a$08$LMiBqE2cCxaDmzkP9zdLgub4GVIoj4TTo3az4/7ckVtZgm5RNrSyG"){
      $scope.openResetPassword();
    }
  }

  function getHeight(height){
    var feet = Math.floor(height/12),
        inches = Math.floor(height%12);
    return feet + "\'" + inches + "\"";
  }

  $scope.authFitbit = function(){
    LoginService.authFitbit().then(
      function( result ){ console.log("Authorization successful"); $scope.user = LoginService.user = result.data; },
      function( error ){ console.log("Authorization attempt failed: ", error); }
    );
  };
////////////////////////////////////////////////////////////////////////////////

  $scope.calGoalLabelVisable = false;
  $scope.showCalGoalLabel = function(){
    $scope.calGoalLabelVisable = true;
  };
  $scope.hideCalGoalLabel = function(){
    $scope.calGoalLabelVisable = false;
  };
  $scope.stepGoalLabelVisable = false;
  $scope.showStepGoalLabel = function(){
    $scope.stepGoalLabelVisable = true;
  };
  $scope.hideStepGoalLabel = function(){
    $scope.stepGoalLabelVisable = false;
  };

  $scope.editingCalGoal = false;
  $scope.calEditText = 'EDIT';
  $scope.calEditIcon = 'settings';
  $scope.editCalGoal = function(){
    $scope.editingCalGoal = !$scope.editingCalGoal;
    if($scope.calEditText === 'SAVE'){
      $scope.calEditText = 'EDIT';
      $scope.calEditIcon = 'settings';
      LoginService.updateTrainee().then(
        function(result){console.log("Trainee saved.", result); LoginService.updateCalGoal();},
        function(error){console.log("Failed to save trainee.", error);}
      );
    }else{
      $scope.calEditText = 'SAVE';
      $scope.calEditIcon = 'save';
    }
  };

  $scope.editingStepGoal = false;
  $scope.stepEditText = 'EDIT';
  $scope.stepEditIcon = 'settings';
  $scope.editStepGoal = function(){
    $scope.editingStepGoal = !$scope.editingStepGoal;
    if($scope.stepEditText === 'SAVE'){
      $scope.stepEditText = 'EDIT';
      $scope.stepEditIcon = 'settings';
      LoginService.updateTrainee().then(
        function(result){console.log("Trainee saved.", result); LoginService.updateStepGoal();},
        function(error){console.log("Failed to save trainee.", error);}
      );
    }else{
      $scope.stepEditText = 'SAVE';
      $scope.stepEditIcon = 'save';
    }
  };

  $scope.editingNeck = false;
  $scope.neckEditIcon = 'plus';
  $scope.editNeck = function(){
    $scope.editingNeck = !$scope.editingNeck;
    if($scope.neckEditIcon === 'plus'){
      $scope.neckEditIcon = 'save';
    }else{
      $scope.neckEditIcon = 'plus';
      LoginService.updateTrainee().then(
        function(result){console.log("Trainee saved.", result);},
        function(error){console.log("Failed to save trainee.", error);}
      );
    }
  };

  $scope.editingChest = false;
  $scope.chestEditIcon = 'plus';
  $scope.editChest = function(){
    $scope.editingChest = !$scope.editingChest;
    if($scope.chestEditIcon === 'plus'){
      $scope.chestEditIcon = 'save';
    }else{
      $scope.chestEditIcon = 'plus';
      LoginService.updateTrainee().then(
        function(result){console.log("Trainee saved.", result);},
        function(error){console.log("Failed to save trainee.", error);}
      );
    }
  };

  $scope.editingWaist = false;
  $scope.waistEditIcon = 'plus';
  $scope.editWaist = function(){
    $scope.editingWaist = !$scope.editingWaist;
    if($scope.waistEditIcon === 'plus') $scope.waistEditIcon = 'save';
    else{
      $scope.waistEditIcon = 'plus';
      LoginService.updateTrainee().then(
        function(result){console.log("Trainee saved.", result);},
        function(error){console.log("Failed to save trainee.", error);}
      );
    }
  };

  $scope.editingHips = false;
  $scope.hipsEditIcon = 'plus';
  $scope.editHips = function(){
    $scope.editingHips = !$scope.editingHips;
    if($scope.hipsEditIcon === 'plus'){
      $scope.hipsEditIcon = 'save';
    }else{
      $scope.hipsEditIcon = 'plus';
      LoginService.updateTrainee().then(
        function(result){console.log("Trainee saved.", result);},
        function(error){console.log("Failed to save trainee.", error);}
      );
    }
  };

  $scope.editingThigh = false;
  $scope.thighEditIcon = 'plus';
  $scope.editThigh = function(){
    $scope.editingThigh = !$scope.editingThigh;
    if($scope.thighEditIcon === 'plus'){
      $scope.thighEditIcon = 'save';
    }else{
      $scope.thighEditIcon = 'plus';
      LoginService.updateTrainee().then(
        function(result){console.log("Trainee saved.", result);},
        function(error){console.log("Failed to save trainee.", error);}
      );
    }
  };

  $scope.editingCalf = false;
  $scope.calfEditIcon = 'plus';
  $scope.editCalf = function(){
    $scope.editingCalf = !$scope.editingCalf;
    if($scope.calfEditIcon === 'plus'){
      $scope.calfEditIcon = 'save';
    }else{
      $scope.calfEditIcon = 'plus';
      LoginService.updateTrainee().then(
        function(result){console.log("Trainee saved.", result);},
        function(error){console.log("Failed to save trainee.", error);}
      );
    }
  };
});
