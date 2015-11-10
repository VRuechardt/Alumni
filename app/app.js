'use strict'

var angular = require('angular');
require('angular-route');

require('./views/home');
require('./views/register');

angular.module('alumni', [
        'ngRoute',
        'alumni.home',
        'alumni.register'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);