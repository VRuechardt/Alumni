'use strict';

module.exports = ['$scope', 'api', '$location', 'account', function($scope, api, $location, account) {

    $scope.user = {
        email: "",
        password: ""
    };
    $scope.loginError = false;

    $scope.login = function() {
        api.post("/api/login", {email: $scope.user.email, password: $scope.user.password})
            .then(function(response) {
                account.checkLogin();
                $location.url('/internal');
            }, function(error) {
                $scope.loginError = true;
            });
    };


}];