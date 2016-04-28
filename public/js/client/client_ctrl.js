var app = angular.module('traxApp');
app.controller('client_ctrl', function($scope, $rootScope, $state, LoginService, $uibModal){
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

//////////////////////// AUTHORIZATION CONTROLS ////////////////////////////////
  // Check for valid login session and assign logged in user to scope //////////
  if(!LoginService.user){
    LoginService.checkIfLogged().then(function( res, err ){
      if(res.data === "error") return $state.go("login");
      $scope.user = LoginService.user = res.data;
      if($scope.user.password === "$2a$08$LMiBqE2cCxaDmzkP9zdLgub4GVIoj4TTo3az4/7ckVtZgm5RNrSyG"){
        $scope.openResetPassword();
      }
      if($scope.user.trainees){
        if($rootScope.currentClient){
          $scope.currentClient = $rootScope.currentClient;
          $scope.displayHeight = getHeight($scope.currentClient.fitbit.user.height);
          $scope.displayWeight = getWeight($scope.currentClient.fitbit.user.weight);
        }else{
          $state.go('trainer');
        }
      }else{
        $scope.currentClient = $scope.user;
        $scope.displayHeight = getHeight($scope.currentClient.fitbit.user.height);
        $scope.displayWeight = getWeight($scope.currentClient.fitbit.user.weight);
      }
    });
  } else {
    $scope.user = LoginService.user;
    if($scope.user.password === "$2a$08$LMiBqE2cCxaDmzkP9zdLgub4GVIoj4TTo3az4/7ckVtZgm5RNrSyG"){
      $scope.openResetPassword();
    }
    if($scope.user.trainees){
      $scope.currentClient = $rootScope.currentClient;
      $scope.displayHeight = getHeight($scope.currentClient.fitbit.user.height);
      $scope.displayWeight = getWeight($scope.currentClient.fitbit.user.weight);
    }else{
      $scope.currentClient = $scope.user;
      $scope.displayHeight = getHeight($scope.currentClient.fitbit.user.height);
      $scope.displayWeight = getWeight($scope.currentClient.fitbit.user.weight);
    }
  }
  function getHeight(height){
    var heightIn = height/2.54,
        feet = Math.floor(heightIn/12),
        inches = Math.floor(heightIn%12);
    return feet + "\'" + inches + "\"";
  }
  function getWeight(weight){
    var kg = weight,
        lbs = Math.round(kg * 2.2046);
    return lbs;
  }
  $scope.authFitbit = function(){
    LoginService.authFitbit().then(function( res, err ){
      console.log('inside the .then...');
      if(res.data === "error") console.log("Authorization attempt failed");
      else {console.log("inside the 'else' statement"); $scope.user = LoginService.user = res.data;}
    });
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
    }
  };

  $scope.editingWaist = false;
  $scope.waistEditIcon = 'plus';
  $scope.editWaist = function(){
    $scope.editingWaist = !$scope.editingWaist;
    if($scope.waistEditIcon === 'plus'){
      $scope.waistEditIcon = 'save';
    }else{
      $scope.waistEditIcon = 'plus';
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
    }
  };
});
