'use strict';

module.exports = ['$scope', 'api', 'account', '$location', function($scope, api, account, $location) {


    $scope.events = [];

    api.get('/api/events', {})
        .then(function(response) {
            $scope.events = response.data;
            $scope.events.forEach(function(o, i) {
                var date = new Date();
                date.setTime(o.startdate);
                o.startdate = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
            });
            if($scope.events.length > 0) {
                $scope.$broadcast('eventChanged', $scope.events[0]);
            }
        });

    $scope.details = function(event) {
        $scope.$broadcast('eventChanged', event);
    };

    /*
    api.post('/api/events', {
        name: 'Test Event',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
        startdate: new Date().getTime(),
        enddate: new Date().getTime() + 1000 * 60 * 60 * 2
    });*/


}];