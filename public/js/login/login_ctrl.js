app.controller('LoginControl', ['$scope', 'LoginService', 'moment', function($scope, LoginService, moment){
  // $scope.CurrentDate = new Date();
  $scope.CurrentDate = moment().format("dddd, MMMM Do");

}]);
