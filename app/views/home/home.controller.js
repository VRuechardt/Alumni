'use strict';

module.exports = ['$scope', 'api', '$location', 'account', function($scope, api, $location, account) {

    $scope.user = {
        email: "",
        password: ""
    };
    $scope.loginError = false;
    $scope.login = function() {
        api.post("/api/login", {email: $scope.user.email, password: $scope.user.password})
            .then(function(response) {
                $scope.authcode = response.data;
                $scope.connectToServer($scope.authcode);
                account.checkLogin();
                $location.url('/internal');
            }, function(error) {
                $scope.loginError = true;
            });
    };

    $scope.connectToServer = function(code){
        $scope.websocket = new WebSocket('ws:\\\\127.0.0.1:9001');
        $scope.websocket.onopen = function(){
           console.log('connected');
           var send = {"task": 'auth', "code": code};
           $scope.websocket.send(JSON.stringify(send));
        };
        $scope.websocket.onmessage = function(e){
            console.log(e);
        }
        $scope.s = function(){
            $scope.websocket.send(JSON.stringify({"task":"msg", "email":"christian.brachert@web.de","message":"it actually worked"}));
        }
        console.log($scope.s);
    }
}];
