var app = angular.module('traxApp');
app.controller('client_ctrl', function($scope, $rootScope){
  $rootScope.currentState = 'clientList';

  $scope.calGoalLabelVisable = false;
  $scope.showCalGoalLabel = function(){
    $scope.calGoalLabelVisable = true;
  }
  $scope.hideCalGoalLabel = function(){
    $scope.calGoalLabelVisable = false;
  }
  $scope.stepGoalLabelVisable = false;
  $scope.showStepGoalLabel = function(){
    $scope.stepGoalLabelVisable = true;
  }
  $scope.hideStepGoalLabel = function(){
    $scope.stepGoalLabelVisable = false;
  }

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
  }

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
  }
});
