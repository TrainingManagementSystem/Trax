var app = angular.module('traxApp');
app.controller('addClientModal', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
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