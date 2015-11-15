'use strict';

angular.module('alumni.internal', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/internal', {
            templateUrl: 'views/internal/internal.html',
            controller: 'InternalController'
        });
    }])

    .controller('InternalController', require('./internal.controller'));