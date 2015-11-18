'use strict';

module.exports = ['$scope', 'api', 'account', '$location', function($scope, api, account, $location) {

    $scope.users = [];

    $scope.loadUsers = function() {
        api.get('/api/users/', {})
            .then(function(response) {
                $scope.users = response.data;
            }, function(error) {
                console.log(error);
            });
    };
    $scope.loadUsers();

}];