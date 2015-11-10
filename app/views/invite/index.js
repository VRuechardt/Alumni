'use strict';

angular.module('alumni.invite', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/invite/', {
            templateUrl: 'views/invite/invite.html',
            controller: 'InviteController'
        });
    }])

    .controller('InviteController', require('./invite.controller'));