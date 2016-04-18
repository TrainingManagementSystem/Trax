angular.module('traxApp', ['ui.router'])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      //home SCREEN
      .state('home', {
        url: '/',
        templateUrl: '/js/home/home.html'
      });
});
