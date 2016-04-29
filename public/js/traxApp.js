angular.module('traxApp', ['ui.router', 'angularMoment', 'ui.bootstrap'])
  .config(function($stateProvider, $urlRouterProvider) {
    /// Authentication protocals  ///
    function authenticate($state, $rootScope, $q, LoginService){
      var deferred = $q.defer();
      if(!LoginService.user)
        LoginService.checkIfLogged().then(
          function(approved){
            LoginService.user = approved.data;
            LoginService.updateData();
            deferred.resolve("Authorized");
          },
          function(rejected){ alert("Please log in first"); deferred.reject("Unauthorized"); $state.go("login");}
        );
      else deferred.resolve("Authorized");
      return deferred.promise;
    }
    // Denies a trainer access to a client page unless he has the client selected
    // function reroute($state, $rootScope, LoginService){
    //   if($scope.user.trainees && !$rootScope.currentClient) $state.go('clientList');
    // }
    // States //
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/js/login/login.html',
		    controller: 'LoginControl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: '/js/signup/signup.html',
        controller: 'LoginControl'
      })
      .state('client', {
        url: '/client',
        templateUrl: '/js/client/client.html',
        controller: "client_ctrl",
        resolve: {
          Authenticate: authenticate
          // Reroute: reroute
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: '/js/about/about.html',
      })
	    .state('clientList', {
        url: '/clientList',
        templateUrl: '/js/clientList/clientList.html',
        controller: "clientList_ctrl",
        resolve: {
          Authenticate: authenticate
        }
      })
      .state('settings', {
        url: '/me/settings',
        templateUrl: '/js/settings/settings.html',
        controller: "settings_ctrl",
        resolve: {
          Authenticate: authenticate
        }
      })
	    .state('trainer', {
        url: '/trainer',
        templateUrl: '/js/trainerDash/trainerDash.html',
        controller: "trainerDash_ctrl",
        resolve: {
          Authenticate: authenticate
        }
      })
      .state('support', {
        url: '/support',
        templateUrl: '/js/support/support.html'
      })
      .state('marketing', {
        url:'/',
        templateUrl: '/js/marketing/marketing.html'
      });
});
