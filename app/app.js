'use strict'

var angular = require('angular');
require('angular-route');

require('./views/home');
require('./views/register');
require('./views/invite');
require('./views/internal');
require('./views/header');
require('./views/events');

angular.module('alumni', [
        'ngRoute',
        'alumni.home',
        'alumni.register',
        'alumni.invite',
        'alumni.internal',
        'alumni.header',
        'alumni.events'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .factory('api', require('./services/api'))
    .factory('account', require('./services/account'));