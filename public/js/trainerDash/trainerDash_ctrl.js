var app = angular.module('traxApp');
app.controller('trainerDash_ctrl', function($scope, $rootScope, $uibModal, $state, LoginService){
  $rootScope.currentState = 'trainer';

//////////////////////// AUTHORIZATION CONTROLS ////////////////////////////////
  // Check for valid login session and assign logged in user to scope //////////
  $scope.user = LoginService.user;
  $scope.authFitbit = function(){
    LoginService.authFitbit().then(function( res, err ){
      if(res.data === "error") console.log("Authorization attempt failed");
      else $scope.user = res.data;
    });
  };
////////////////////////////////////////////////////////////////////////////////

/////////////////////////// DATA FORMATTING ////////////////////////////////////
  $scope.totalWeightLoss = 0;
  $scope.totalSteps = 0;
  for (var i = 0; i < $scope.user.trainees.length; i++) {
    if($scope.user.trainees[i].fitbit.authorized)
      $scope.totalWeightLoss += $scope.user.trainees[i].fitbit.user.weight -
                                $scope.user.trainees[i].starting.weight;
    if($scope.user.trainees[i].fitbit.authorized)
      $scope.totalSteps += $scope.user.trainees[i].fitbit.steps.lifetime -
                           $scope.user.trainees[i].starting.steps;
  }
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


  $scope.goToClient = function(selectedClient){
    $rootScope.currentClient = selectedClient;
    $state.go('client');
  };

});
