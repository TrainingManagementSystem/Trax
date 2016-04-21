angular.module('traxApp', ['ui.router', 'angularMoment'])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      //home SCREEN
      .state('home', {
        url: '/',
        templateUrl: '/js/home/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/js/login/login.html',
<<<<<<< Updated upstream
		  controller: 'LoginControl'
=======
		    controller: 'LoginControl'
>>>>>>> Stashed changes
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/js/dashboard/dashboard.html'
      })
      .state('nav', {
        url: '/nav',
        templateUrl: '/js/directives/navDirective.html'
      })
      .state('client', {
        url: '/client',
        templateUrl: '/js/client/client.html',
        controller: "client_ctrl"
      })
<<<<<<< Updated upstream
      .state('about', {
        url: '/about',
        templateUrl: '/js/about/about.html',
      })
=======
>>>>>>> Stashed changes
	    .state('clientList', {
        url: '/clientList',
        templateUrl: '/js/clientList/clientList.html',
        controller: "clientList_ctrl"
      })
      .state('settings', {
        url: '/me/settings',
        templateUrl: '/js/settings/settings.html',
        controller: "settings_ctrl"
      })
	    .state('trainer', {
        url: '/trainer',
        templateUrl: '/js/trainerDash/trainerDash.html',
      })
   	$urlRouterProvider
  	.otherwise('/');
});
