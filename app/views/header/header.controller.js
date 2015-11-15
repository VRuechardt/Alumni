'use strict';

module.exports = ['$scope', 'api', function($scope, api, $rootScope, $routeParams) {

    $scope.logout = function() {
        console.log("logging out")
        api.get("/api/logout", {})
            .then(function(response) {
                console.log(response);
            }, function(error) {
                console.log(error);
            });
    };



}];