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
        me: {},
        loading: false,

        checkLogin: function(callback) {
            if(callback) {
                accountService.callbacks.push(callback);
            }
            if(!accountService.loading) {
                accountService.loading = true;
                $http.get('/api/check_login', {})
                    .then(function(response) {
                        if(response.data.unauthorized) {
                            accountService.loggedIn = false;
                        } else {
                            accountService.loggedIn = true;
                            accountService.me = response.data;
                        }
                        accountService.notify();
                        accountService.loading = false;
                    }, function(error) {
                        accountService.loggedIn = false;
                        accountService.notify();
                        accountService.loading = false;
                    })
            }

        }

    };

    return accountService;

}];