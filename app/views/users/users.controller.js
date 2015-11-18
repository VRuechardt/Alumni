'use strict';

module.exports = ['$scope', 'api', '$rootScope', function($scope, api, $rootScope) {

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

    $scope.chatTo = function(email) {
        $rootScope.$broadcast('newchat', email);
    };

}];