'use strict';

angular.module('alumni.users', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users/', {
            templateUrl: 'views/users/users.html',
            controller: 'UsersController'
        });
    }])

    .controller('UsersController', require('./users.controller'));