'use strict';

module.exports = ['$http', '$location', function($http, $location) {

    var restService = {
        post: function(endpoint, data) {
            var promise = {
                success: function(){},
                error: function() {},
                then: function(success, error) {
                    this.error = error;
                    this.success = success;
                }
            };
            $http.post(endpoint, data)
                .then(function(response) {
                    if(response.data.unauthorized) {
                        $location.url('/');
                    } else {
                        promise.success(response);
                    }
                }, promise.error);
            return promise;
        },
        put: function(endpoint, data) {
            var promise = {
                success: function(){},
                error: function() {},
                then: function(success, error) {
                    this.error = error;
                    this.success = success;
                }
            };
            $http.put(endpoint, data)
                .then(function(response) {
                    if(response.data.unauthorized) {
                        $location.url('/');
                    } else {
                        promise.success();
                    }
                }, promise.error);
            return promise;
        },
        get: function(endpoint, data) {
            var promise = {
                success: function(){},
                error: function() {},
                then: function(success, error) {
                    this.error = error;
                    this.success = success;
                }
            };
            $http.get(endpoint, data)
                .then(function(response) {
                    if(response.data.unauthorized) {
                        $location.url('/');
                    } else {
                        promise.success();
                    }
                }, promise.error);
            return promise;
        }
    };

    return restService;

}];