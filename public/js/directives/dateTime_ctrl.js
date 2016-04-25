var app = angular.module('traxApp');
app.controller('dateTime_ctrl', function ($scope) {

  $scope.currentDate = moment().format('dddd [,] MMMM D');

  $scope.currentTime = moment().format('h:mm a')
  
});