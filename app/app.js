'use strict'

var angular = require('angular');
require('angular-route');

require('./views/home');
require('./views/register');
require('./views/invite');
require('./views/internal');
require('./views/header');
require('./views/events');
require('./views/event');
require('./views/users');
require('./views/user');
require('./views/chat');

angular.module('alumni', [
        'ngRoute',
        'alumni.home',
        'alumni.register',
        'alumni.invite',
        'alumni.internal',
        'alumni.header',
        'alumni.events',
        'alumni.event',
        'alumni.users',
        'alumni.user',
        'alumni.chat',
        'scDateTime',
        'luegg.directives'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .factory('api', require('./services/api'))
    .factory('account', require('./services/account'))
    .factory('chat', require('./services/chat'));