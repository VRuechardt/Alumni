'use strict';

angular.module('alumni.event', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/event/:event_id', {
            templateUrl: 'views/event/event.html',
            controller: 'EventController'
        });
    }])

    .controller('EventController', require('./event.controller'))
    .directive('eventDirective', require('./event.directive'));