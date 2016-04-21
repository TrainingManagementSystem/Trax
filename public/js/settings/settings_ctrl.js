var app = angular.module('traxApp');
app.controller('settings_ctrl', function($scope){
  $scope.editingBilling = false;
  $scope.editBilling = function(){
    $scope.editingBilling = !$scope.editingBilling;
  }

  $scope.editingProfile = false;
  $scope.editProfile = function(){
    $scope.editingProfile = !$scope.editingProfile;
  }
});
