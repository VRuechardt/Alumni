'use strict';

module.exports = ['$scope', 'api', '$rootScope', '$routeParams', function($scope, api, $rootScope, $routeParams) {

    $scope.user = {
        firstname: "",
        lastname: "",
        password: ""
    };

    $scope.register = function() {
        if($scope.user.firstname && $scope.user.lastname && $scope.user.password) {
            api.put("/api/user", {firstname: $scope.user.firstname, lastname: $scope.user.lastname, password: $scope.user.password, code: $routeParams.code})
                .then(function(response) {
                    console.log(response);
                });
        }
    };



}];