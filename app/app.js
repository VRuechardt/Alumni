'use strict'

var angular = require('angular');
require('angular-route');

require('./views/home');
require('./views/register');
require('./views/invite');

angular.module('alumni', [
        'ngRoute',
        'alumni.home',
        'alumni.register',
        'alumni.invite'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);