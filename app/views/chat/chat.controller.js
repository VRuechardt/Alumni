'use strict';

module.exports = ['$scope', 'api', 'account', 'chat', function($scope, api, account, chat) {

    $scope.conversations = [];
    $scope.loggedIn = false;

    $scope.recvMessage = function(message) {

        console.log(message);

        $scope.conversations.forEach(function(o, i) {
            if(o.conversation_id*1 === message.data.conversation_id) {
                o.messages.push(message.data);
            }
            $scope.$apply();
        });

    };

    account.checkLogin(function(loggedIn) {
        $scope.loggedIn = loggedIn;
        if(loggedIn) {
            $scope.loadConversations();
            console.log(account.me);
            chat.connect(account.me.logincode);
            chat.listen($scope.recvMessage);
        }
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

        chat.send(conv.conversationID, conv.newMessage);
        conv.messages.push({
            content: conv.newMessage,
            conversationID: conv.conversationID,
            userID: account.me.id,
            timestamp: new Date().getTime()
        });
        conv.newMessage = '';

    };

}];