'use strict';

module.exports = ['$http', '$location', function($http, $location) {

    var accountService = {

        loggedIn: false,
        checkLogin: function(callback) {
            $http.get('/api/check_login', {})
                .then(function(response) {
                    if(response.data.authorized) {
                        accountService.loggedIn = true;
                    } else {
                        accountService.loggedIn = false;
                    }
                    callback(accountService.loggedIn);

                }, function(error) {
                    accountService.loggedIn = false;
                    callback(accountService.loggedIn);
                })
        }

    };

    return accountService;

}];