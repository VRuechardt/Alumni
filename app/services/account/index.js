'use strict';

module.exports = ['$http', '$location', function($http, $location) {

    var accountService = {

        callbacks: [],
        notify: function() {
            accountService.callbacks.forEach(function(o, i) {
                o(accountService.loggedIn);
            });
        },
        loggedIn: false,
        checkLogin: function(callback) {
            if(callback) {
                accountService.callbacks.push(callback);
            }
            $http.get('/api/check_login', {})
                .then(function(response) {
                    if(response.data.authorized) {
                        accountService.loggedIn = true;
                    } else {
                        accountService.loggedIn = false;
                    }
                    accountService.notify();

                }, function(error) {
                    accountService.loggedIn = false;
                    accountService.notify();
                })
        }

    };

    return accountService;

}];