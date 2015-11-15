'use strict';

angular.module('alumni.events', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/events', {
            templateUrl: 'views/events/events.html',
            controller: 'EventsController'
        });
    }])

    .controller('EventsController', require('./events.controller'));