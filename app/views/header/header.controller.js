'use strict';

module.exports = ['$scope', 'api', 'account', '$location', function($scope, api, account, $location) {

    $scope.logout = function() {
        api.get("/api/logout", {})
            .then(function(response) {
                $location.url('/');
                account.checkLogin();
            }, function(error) {
                $location.url('/');
                account.checkLogin();
            });
    };

    $scope.loggedIn = false;

    account.checkLogin(function(loggedIn) {
        $scope.loggedIn = loggedIn;
    })


}];