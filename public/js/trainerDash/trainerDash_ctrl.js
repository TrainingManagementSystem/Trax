var app = angular.module('traxApp');
app.controller('trainerDash_ctrl', function($scope, $rootScope, $uibModal, $state, LoginService){
  $rootScope.currentState = 'trainer';

$scope.user = {fitbit:{user:{avatar:"../img/users/user-seven.jpg"}}};
//////////////////////// AUTHORIZATION CONTROLS ////////////////////////////////
  // Check for valid login session and assign logged in user to scope //////////
  if(!LoginService.user){
    LoginService.checkIfLogged().then(function( res, err ){
      if(res.data === "error") return $state.go("login");
      $scope.user = LoginService.user = res.data;
    });
  } else {
    $scope.user = LoginService.user;
  }
  $scope.authFitbit = function(){
    LoginService.authFitbit().then(function( res, err ){
      if(res.data === "error") console.log("Authorization attempt failed");
      else $scope.user = LoginService.user = res.data;
    });
  };
////////////////////////////////////////////////////////////////////////////////

  $scope.client = {
    fname: 'John',
    lname:'Doe',
    profImage: '/img/users/user-eight.jpg',
    agegen: '31 M',
    height: '5\' 8\"',
    weight: '192LBS',
    status: 'good'
  };

  $scope.openInfo = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/js/modal/clientInfoModal.html',
      controller: 'clientInfoModal',
      size: size,
      resolve: {
        client: function () {
          return $scope.client;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };


});
