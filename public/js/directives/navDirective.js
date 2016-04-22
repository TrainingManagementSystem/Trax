angular.module('traxApp').directive('dashboard', function() {
  return {
    restrict: 'E',
    templateUrl: './js/directives/navDirective.html',
    controller:function($scope, $state, $rootScope){
      $scope.currentState = $rootScope.currentState;
      $scope.goToState = function(state){
        $rootScope.currentState = state;
        $state.go(state);
      }
    }
  };
});
