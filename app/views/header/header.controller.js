'use strict';

module.exports = ['$scope', 'api', 'account', function($scope, api, account) {

    $scope.logout = function() {
        console.log("logging out")
        api.get("/api/logout", {})
            .then(function(response) {
                console.log(response);
            }, function(error) {
                console.log(error);
            });
    };

    account.checkLogin(function(loggedIn) {
        console.log("user login status: ", loggedIn);
    })


}];