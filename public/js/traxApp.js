angular.module('traxApp', ['ui.router', 'angularMoment'])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      //SPLASH SCREEN
      .state('home', {
        url: '/',
        templateUrl: 'splash.html'
      });
