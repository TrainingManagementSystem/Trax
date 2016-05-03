angular.module('traxApp').directive('dashboard', function() {
  return {
    restrict: 'E',
    templateUrl: './js/directives/navDirective.html',
    controller: function($scope, $state, $rootScope, $uibModal, $interval, $timeout, LoginService){
        // Assign user data to scope
        $scope.user = LoginService.user;

        // Date & Time on Nav Aside
        var updateTime = function(){
          var now = moment();
          $scope.currentDate = now.format('dddd, MMMM D [|] h:mm A');
          var hour = now.hour();
          if(hour < 12) $scope.greeting = "Good Morning";
          else if(hour > 18) $scope.greeting = "Good Evening";
          else $scope.greeting = "Good Afternoon";
        };
        updateTime();

        //Update the now variable with the current time once every 60 seconds
        var tillTheMinute = (60 - moment().second())*1000;
        $timeout(function(){
            updateTime();
            var minuteIteration = $interval(updateTime, 60000);
            $scope.$on('$destroy', function(){ $interval.cancel(minuteIteration); });
        }, tillTheMinute);

        // Controls the stying for the link pertaining to the active view
        $scope.currentState = $rootScope.currentState;
        $scope.goToState = function(state){
          $rootScope.currentState = state;
          $state.go(state);
        };

        //Logout function
        $scope.logout = function(){
          LoginService.logout().then(function(){
            $state.go('login');
          });
        };

        if($rootScope.todaysSessions){
          $scope.numberOfSessions = $rootScope.todaysSessions.length;
        }else{
          if(!$scope.user.trainees){
            var todaysSessions = [];
            for(var i = 0; i < $scope.user.schedule.length; i++){
              if($scope.user.schedule[i].dayOfWeek === moment().weekday()){
                todaysSessions.push($scope.user.schedule[i]);
              }
            }
            $scope.numberOfSessions = todaysSessions.length;
          }
        }
        ////////////// Logic for the 'Add a new client' modal //////////////////
        $scope.open = function (size) {
          var modalInstance = $uibModal.open({
            // animation: $scope.animationsEnabled,
            templateUrl: '/js/modal/addClientModal.html',
            controller: 'addClientModal',
            size: size,
            resolve: {
              id: function () {
                return $scope.user._id;
              }
            }
          });
          modalInstance.result.then(function ( res, err ) {
            console.log("Final res: ", res);
            $scope.user = LoginService.user;
          });
        };
        ////////////////////////////////////////////////////////////////////////
    }
  };
});
