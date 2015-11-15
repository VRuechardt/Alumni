'use strict';

angular.module('alumni.header', ['ngRoute'])

    .config([function($routeProvider) {
    }])

    .controller('HeaderController', require('./header.controller'))
    .directive('headerDirective', require('./header.directive'));