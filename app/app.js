'use strict';

// Declare app level module which depends on views, and components
angular.module('facebookLir', [
  'ngRoute',
  'facebookLir.likesCounter'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/facebook'});
}])
.factory('serviceId', function() {
  return function (string) {
    console.log(string);
  }
  // factory function body that constructs shinyNewServiceInstance
  return shinyNewServiceInstance;
});
