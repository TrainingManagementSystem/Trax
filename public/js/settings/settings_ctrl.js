var app = angular.module('traxApp');
app.controller('settings_ctrl', function($scope, $rootScope){
  $rootScope.currentState = 'settings';
  $scope.editingBilling = false;
  $scope.editBilling = function(){
    $scope.editingBilling = !$scope.editingBilling;
  }

  $scope.editingProfile = false;
  $scope.editProfile = function(){
    $scope.editingProfile = !$scope.editingProfile;
  }
});
