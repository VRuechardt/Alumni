'use strict';

module.exports = ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

    console.log("controller started");

    $http.get("http://localhost:5000/")
        .then(function(response) {
            console.log(response);
        });

}];