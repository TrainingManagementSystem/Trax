var app = angular.module('traxApp');
app.controller('clientList_ctrl', function($scope, $state){
  $scope.goToState = function(state){
    $state.go(state);
  }
});
