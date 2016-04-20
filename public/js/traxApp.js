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
        controller: 'FrontendControl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/js/dashboard/dashboard.html'
      })
   	$urlRouterProvider
  	.otherwise('/');
});