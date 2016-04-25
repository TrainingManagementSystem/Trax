var app = angular.module('traxApp');
app.controller('clientInfoModal', function ($scope, $uibModalInstance, client) {

  $scope.client = client;
  $scope.selected = {
    item: ['testing', 'testing testing']
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
