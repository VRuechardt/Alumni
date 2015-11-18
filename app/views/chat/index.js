'use strict';

angular.module('alumni.chat', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
    }])

    .controller('ChatController', require('./chat.controller'))
    .directive('chatDirective', require('./chat.directive'));