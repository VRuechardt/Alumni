'use strict';

module.exports = ['$scope', 'api', 'account', '$location', '$routeParams', '$sce', function($scope, api, account, $location, $routeParams, $sce) {


    $scope.formatDate = function(date) {
        var minutes = "" + date.getMinutes();
        if(minutes.length < 2) {
            minutes = "0" + minutes;
        }
        return date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ', ' + date.getHours() + ':' + minutes;
    };


    if($routeParams.event_id) {
        api.get('/api/event/' + $routeParams.event_id, {})
            .then(function(response) {
                $scope.event = response.data;
                var date = new Date();
                date.setTime(event.startdate);
                event.startdate = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
                $scope.event.htmldescription = $scope.event.description;
                $scope.event.description = function() {
                    return $sce.trustAsHtml(this.htmldescription);
                };
                $scope.loadCreator();
                $scope.loadState();
                $scope.loadAnnouncements();
            });
    }


    $scope.$on('eventChanged', function(e, event) {
        $scope.event = event;
        $scope.loadCreator();
        $scope.loadState();
        $scope.loadAnnouncements();
    });

    $scope.creator = {};

    $scope.loadCreator = function() {
        api.get('/api/user/' + $scope.event.userID, {})
            .then(function(response) {
                $scope.creator = response.data;
            });
    };

    $scope.loadState = function() {
        $scope.attendState = {
            state: 'none'
        };
        api.get('/api/event/' + $scope.event.id + '/attend', {})
            .then(function(response) {
                $scope.attendState = {
                    state: response.data.state
                };
            }, function(error) {
                $scope.attendState = {
                    state: 'none'
                };
            });
    };

    $scope.attendState = {
        state: 'invited'
    };
    $scope.changeAttending = function() {
        api.put('/api/event/' + $scope.event.id + '/attend', $scope.attendState)
            .then(function(response) {
                Materialize.toast('Your reply was saved.', 3000);
            }, function(error) {

            });
    };


    $scope.announcements = [];
    $scope.announcement = {
        comment: ''
    };
    $scope.loadAnnouncements = function() {
        api.get('/api/event/' + $scope.event.id + '/posts', {})
            .then(function(response) {
                $scope.announcements = response.data;
                $scope.announcements.forEach(function(o, i) {
                    var date = new Date();
                    date.setTime(o.posted);
                    o.posted = $scope.formatDate(date);
                });
            });
    };
    $scope.postAnnouncement = function() {
        api.post('/api/event/' + $scope.event.id + '/posts', $scope.announcement)
            .then(function(response) {
                console.log(response);
                $scope.loadAnnouncements();
            });
    };

}];