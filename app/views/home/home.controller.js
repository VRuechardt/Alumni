'use strict';

module.exports = ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

    console.log("controller started");

    $http.get("/api/")
        .then(function(response) {
            console.log(response);
        });

}];