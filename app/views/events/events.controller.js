'use strict';

module.exports = ['$scope', 'api', 'account', '$location', function($scope, api, account, $location) {


    $scope.events = [];

    api.post('/api/events', {
        name: 'Test Event',
        startdate: new Date().getTime(),
        enddate: new Date().getTime() + 1000*60*60*2
    })
        .then(function(response) {
            console.log(response);
        }, function(error) {
            console.log(error);
        })


}];