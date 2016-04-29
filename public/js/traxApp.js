angular.module('traxApp', ['ui.router', 'angularMoment', 'ui.bootstrap'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      //home SCREEN
      // .state('home', {
      //   url: '/',
      //   templateUrl: '/js/home/home.html'
      // })
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
        controller: "client_ctrl"
      })
      .state('about', {
        url: '/about',
        templateUrl: '/js/about/about.html',
      })
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
        controller: "trainerDash_ctrl"
      })
      .state('support', {
        url: '/support',
        templateUrl: '/js/support/support.html'
      })
      .state('marketing', {
        url:'/',
        templateUrl: '/js/marketing/marketing.html'
      })
      .state('schedule', {
        url: '/schedule',
        templateUrl: '/js/schedule/schedule.html'
      });
});
