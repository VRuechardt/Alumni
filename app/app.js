'use strict'

var angular = require('angular');
require('angular-route');

require('./views/home');

angular.module('alumni', [
        'ngRoute',
        'alumni.home'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);