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
.service('$getPosts',function () {
  console.log ("service is acting");
})
;
;
