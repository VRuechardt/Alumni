'use strict';

angular.module('alumni.register', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register/:code', {
            templateUrl: 'views/register/register.html',
            controller: 'RegisterController'
        });
    }])

    .controller('RegisterController', require('./register.controller'));