var app = angular.module('traxApp');
app.controller('trainerDash_ctrl', function($scope, $rootScope, $uibModal, $state, LoginService){
  $rootScope.currentState = 'trainer';

  $scope.currentDayOfWeek = moment().weekday();


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

  $scope.todaysSessions = [];
  $scope.todaysSessionTimes = [];
  for(var i =0; i < $scope.user.trainees.length; i++){
    for(var j = 0; j < $scope.user.trainees[i].schedule.length; j++){
      if($scope.user.trainees[i].schedule[j].dayOfWeek === $scope.currentDayOfWeek){
        var sessionToPush = $scope.user.trainees[i].schedule[j];
        sessionToPush.clientName = $scope.user.trainees[i].firstName + ' ' + $scope.user.trainees[i].lastName;
        if(sessionToPush.time > 12){
          sessionToPush.calcTime = sessionToPush.time;
          sessionToPush.calcTime -= 12;
          sessionToPush.calcTime += ':00';
          sessionToPush.timeOfDay = 'PM'
        }else{
          sessionToPush.calcTime = sessionToPush.time;
          sessionToPush.calcTime += ':00';
          sessionToPush.timeOfDay = 'AM'
        }
        sessionToPush.client = $scope.user.trainees[i];
        $scope.todaysSessions.push(sessionToPush);
        $scope.todaysSessionTimes.push(sessionToPush.time);
        console.log($scope.todaysSessionTimes);
      }
    }
  }
  $rootScope.todaysSessions = $scope.todaysSessions;

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

  $scope.openInfo = function (client) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/js/modal/clientInfoModal.html',
      controller: 'clientInfoModal',
      resolve: {
        client: function () {
          console.log( client );
          return client;
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
