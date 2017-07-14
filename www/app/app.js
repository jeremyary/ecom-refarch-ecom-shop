window.angular = require("angular");
require("angular-animate");
require("angular-resource");
require("angular-ui-router");
require("ionic-scripts");
require("angular-route");
require("angular-sanitize");

var myApp = angular.module('myApp', ['ionic', 'ngRoute',
    'ngSanitize',
    'myApp.controllers',
    'myApp.directives',
    'myApp.services',
    'myApp.filters',
    'fhcloud'
]).constant('$fh', require("fh-js-sdk"));

myApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/example.html',
            controller: 'MainCtrl'
        });
});