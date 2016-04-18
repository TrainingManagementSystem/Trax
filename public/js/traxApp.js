angular.module('traxApp', ['ui.router', 'angularMoment'])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      //home SCREEN
      .state('home', {
        url: '/',
        templateUrl: './home/splash.html'
      });
};
