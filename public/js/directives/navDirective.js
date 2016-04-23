angular.module('traxApp').directive('dashboard', function() {
  return {
    restrict: 'E',
    templateUrl: './js/directives/navDirective.html',
    controller:function($scope, $state, $rootScope, $uibModal){
      $scope.currentState = $rootScope.currentState;
      $scope.goToState = function(state){
        $rootScope.currentState = state;
        $state.go(state);
      } 

      $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/js/modal/addClientModal.html',
      controller: 'addClientModal',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };
    }
  };
});
