'use strict';

module.exports = ['$scope', '$http', '$rootScope', '$routeParams', function($scope, $http, $rootScope, $routeParams) {

    console.log("controller started");

    $scope.user = {
        firstname: "",
        lastname: "",
        password: ""
    };

    $scope.register = function() {
        if($scope.user.firstname && $scope.user.lastname && $scope.user.password) {
            $http.post("/api/user", {firstname: $scope.user.firstname, lastname: $scope.user.lastname, password: $scope.user.password, code: $routeParams.code})
                .then(function(response) {
                    console.log(response);
                });
        }
    };



}];