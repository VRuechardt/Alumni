'use strict';

module.exports = ['$scope', 'api', 'account', '$location', '$sce', function($scope, api, account, $location, $sce) {

    $scope.formatDate = function(date) {
        var minutes = "" + date.getMinutes();
        if(minutes.length < 2) {
            minutes = "0" + minutes;
        }
        return date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ', ' + date.getHours() + ':' + minutes;
    };

    var inOneHour = new Date();
    inOneHour.setTime(inOneHour.getTime() + 1000 * 60 * 60);
    $scope.events = [];
    $scope.newEvent = {
        name: '',
        description: '',
        startdate: $scope.formatDate(new Date()),
        enddate: $scope.formatDate(inOneHour),
        startAsDate: new Date(),
        endAsDate: inOneHour
    };
    $scope.currentDate = new Date();
    $scope.pickingDate = false;

    $scope.loadEvents = function() {
        api.get('/api/events', {})
            .then(function(response) {
                $scope.events = response.data;
                $scope.events.forEach(function(o, i) {
                    var date = new Date();
                    date.setTime(o.startdate);
                    o.startdate = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
                    o.realdescription = o.description;
                    o.shortdescription = function() {
                        return $sce.trustAsHtml(this.realdescription.length > 100 ? (this.realdescription.substring(0, 100) + '...') : this.realdescription);
                    };
                    o.description = function() {
                        return $sce.trustAsHtml(this.realdescription);
                    };
                });
                if($scope.events.length > 0) {
                    $scope.$broadcast('eventChanged', $scope.events[0]);
                }
            });
    };
    $scope.loadEvents();

    $scope.details = function(event) {
        $scope.$broadcast('eventChanged', event);
    };

    $scope.createEvent = function() {
        $('#createEvent').openModal();
    };

    $scope.currentType = 'start';
    $scope.startDateTime = function(type) {
        $scope.currentType = type;
        if($scope.currentType === 'start') {
            $scope.currentDate = $scope.newEvent.startAsDate;
        } else {
            $scope.currentDate = $scope.newEvent.endAsDate;
        }
        $scope.pickingDate = true;
    };
    $scope.cancelDateTime = function() {
        $scope.pickingDate = false;
    };

    $scope.saveDateTime = function() {
        if($scope.currentType === 'start') {
            if($scope.currentDate.getTime() >= $scope.newEvent.endAsDate.getTime()) {
                var nDate = new Date();
                nDate.setTime($scope.currentDate.getTime() + 1000 * 60 * 60);
                $scope.newEvent.endAsDate = nDate;
                $scope.newEvent.enddate = $scope.formatDate($scope.newEvent.endAsDate);
            }
            $scope.newEvent.startdate = $scope.formatDate($scope.currentDate);
            $scope.newEvent.startAsDate = $scope.currentDate;
        } else {
            if($scope.currentDate.getTime() <= $scope.newEvent.startAsDate.getTime()) {
                var nDate = new Date();
                nDate.setTime($scope.currentDate.getTime() - 1000 * 60 * 60);
                $scope.newEvent.startAsDate = nDate;
                $scope.newEvent.startdate = $scope.formatDate($scope.newEvent.startAsDate);
            }
            $scope.newEvent.enddate = $scope.formatDate($scope.currentDate);
            $scope.newEvent.endAsDate = $scope.currentDate;
        }
        $scope.pickingDate = false;
    };


    $scope.saveEvent = function() {
        if($scope.newEvent.name && $scope.newEvent.description) {
            api.post('/api/events', {
                name: $scope.newEvent.name,
                description: $scope.newEvent.description,
                startdate: $scope.newEvent.startAsDate.getTime(),
                enddate: $scope.newEvent.endAsDate.getTime()
            })
                .then(function(response) {
                    var inOneHour = new Date();
                    inOneHour.setTime(inOneHour.getTime() + 1000 * 60 * 60);
                    $scope.newEvent = {
                        name: '',
                        description: '',
                        startdate: $scope.formatDate(new Date()),
                        enddate: $scope.formatDate(inOneHour),
                        startAsDate: new Date(),
                        endAsDate: inOneHour
                    };
                    $('#createEvent').closeModal();
                    $scope.loadEvents();
                }, function(error) {
                    Materialize.toast('The event could not be created.');
                });
        }
    };

    /*
    api.post('/api/events', {
        name: 'Test Event',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
        startdate: new Date().getTime(),
        enddate: new Date().getTime() + 1000 * 60 * 60 * 2
    });*/


}];