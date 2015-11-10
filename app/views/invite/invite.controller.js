'use strict';

module.exports = ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

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
        $http.post("/api/user", {email: $scope.users[0].email})
            .then(function(response) {
                console.log(response);
            });
    };

}];