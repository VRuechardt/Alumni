'use strict';

module.exports = ['$scope', 'api', '$rootScope', '$location', '$http', function($scope, api, $rootScope, $location, $http) {

    console.log($http);

    $scope.user = {
        email: "",
        password: ""
    };
    $scope.loginError = false;

    $scope.login = function() {
        api.post("/api/login", {email: $scope.user.email, password: $scope.user.password})
            .then(function(response) {
                console.log(response);
                $location.url('/internal')
            }, function(error) {
                $scope.loginError = true;
            });
    };


}];