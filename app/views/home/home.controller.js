'use strict';

module.exports = ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

    console.log("controller started");

    $scope.user = {
        email: "",
        password: ""
    };

    $scope.login = function() {
        $http.post("/api/login", {email: $scope.user.email, password: $scope.user.password})
            .then(function(response) {
                console.log(response);
            });
    };



}];