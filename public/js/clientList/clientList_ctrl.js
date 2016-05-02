var app = angular.module('traxApp');
app.controller('clientList_ctrl', function($scope, $state, $rootScope){
  $rootScope.currentState = 'clientList';
  $scope.goToState = function(state){
    $state.go(state);
  }

   $scope.goToClient = function(selectedClient){
    $rootScope.currentClient = selectedClient;
    $state.go('client');
  };



});
