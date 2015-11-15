'use strict';

module.exports = ['$scope', 'api', 'account', '$location', '$routeParams', function($scope, api, account, $location, $routeParams) {

    if($routeParams.event_id) {
        api.get('/api/event/' + $routeParams.event_id, {})
            .then(function(response) {
                $scope.event = response.data;
                var date = new Date();
                date.setTime(event.startdate);
                event.startdate = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
            });
    }


    $scope.$on('eventChanged', function(e, event) {
        $scope.event = event;
    });


}];