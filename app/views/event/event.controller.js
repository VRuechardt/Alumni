'use strict';

module.exports = ['$scope', 'api', 'account', '$location', '$routeParams', '$sce', function($scope, api, account, $location, $routeParams, $sce) {

    if($routeParams.event_id) {
        api.get('/api/event/' + $routeParams.event_id, {})
            .then(function(response) {
                $scope.event = response.data;
                var date = new Date();
                date.setTime(event.startdate);
                event.startdate = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
                $scope.event.htmldescription = $scope.event.description;
                $scope.event.description = function() {
                    return $sce.trustAsHtml($scope.event.htmldescription);
                };
            });
    }


    $scope.$on('eventChanged', function(e, event) {
        $scope.event = event;
        $scope.event.htmldescription = $scope.event.description;
        $scope.event.description = function() {
            return $sce.trustAsHtml($scope.event.htmldescription);
        };
    });


}];