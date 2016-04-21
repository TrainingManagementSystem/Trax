var app = angular.module('traxApp');
app.controller('client_ctrl', function($scope){
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
});
