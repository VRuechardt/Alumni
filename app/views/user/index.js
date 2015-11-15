'use strict';

angular.module('alumni.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user/:user_id', {
            templateUrl: 'views/user/user.html',
            controller: 'UserController'
        });
    }])

    .controller('UserController', require('./user.controller'));