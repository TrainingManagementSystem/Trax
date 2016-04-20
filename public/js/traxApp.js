angular.module('traxApp', ['ui.router'])
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
        templateUrl: '/js/login/login.html'
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
   	$urlRouterProvider
  	.otherwise('/');
});
