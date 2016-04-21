angular.module('traxApp').directive('dashboard', function() {
  return {
    restrict: 'E',
    templateUrl: './js/directives/navDirective.html',
    controller:function($scope, $state){
      $scope.goToState = function(state){
        $state.go(state);
      }
    }
  };
});
