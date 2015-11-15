'use strict';

module.exports = ['$scope', 'api', 'account', '$location', function($scope, api, account, $location) {


    $scope.$on('eventChanged', function(e, event) {
        $scope.event = event;
    });


}];