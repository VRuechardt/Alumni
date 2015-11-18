'use strict';

module.exports = ['$scope', 'api', 'account', '$location', '$routeParams', '$sce', function($scope, api, account, $location, $routeParams, $sce) {

    $scope.conversations = [];
    $scope.loggedIn = false;

    account.checkLogin(function(loggedIn) {
        $scope.loggedIn = loggedIn;
        $scope.loadConversations();
    });

    $scope.loadConversations = function() {

        api.get('/api/conversation', {})
            .then(function(response) {
                $scope.conversations = response.data;
                $scope.conversations.forEach(function(o, i) {
                    o.messages = [];
                    o.newMessage = '';
                });
            }, function(error) {
                console.log(error);
            });

    };

    $scope.loadMessages = function(conv) {
        if(!conv.start_id) {
            conv.start_id = 0;
            api.get('/api/conversation/' + conv.conversationID + '/' + conv.start_id, {})
                .then(function(response) {
                    conv.messages = response.data;
                }, function(error) {
                    console.log("errors: ");
                    console.log(error);
                });
        }
    };

    $scope.openChat = function(conv) {
        conv.visible = true;
        $scope.loadMessages(conv);
    };

    $scope.$on('newchat', function(e, email) {

        api.post('/api/conversation', {topic: 'No Topic', participants: [email]})
            .then(function(response) {
                $scope.loadConversations();
            }, function(error) {
                console.log(error);
            })

    });

    $scope.sendMessage = function(conv) {

        conv.newMessage = '';

    };

}];