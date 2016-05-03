var app = angular.module('traxApp');
app.controller('clientInfoModal', function ($scope, $uibModalInstance, client, $rootScope, $state) {
console.log( client )
  $scope.client = client;
  $scope.selected = {
    item: ['testing', 'testing testing']
  };

  function getHeight(height){
    // height /= 2.54;  // If using metric units
    var feet = Math.floor(height/12),
        inches = Math.floor(height%12);
    $scope.clientHeight = feet + "\'" + inches + "\"";
  }
  getHeight($scope.client.fitbit.user.height);
  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.goToClient = function () {
    $rootScope.currentClient = $scope.client;
    $uibModalInstance.dismiss('cancel');
    $state.go('client');
  };
});
