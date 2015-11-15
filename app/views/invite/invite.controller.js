'use strict';

module.exports = ['$scope', 'api', '$rootScope', function($scope, api, $rootScope) {

    $scope.users = [
        {
            email: ''
        }
    ];


    $scope.addUser = function() {
        $scope.users.push({
            email: ''
        });
    };


    $scope.remove = function(index) {
        $scope.users.splice(index, 1);
    };

    $scope.invite = function() {
        api.post("/api/user", {email: $scope.users[0].email})
            .then(function(response) {
                console.log(response);
            });
    };

}];