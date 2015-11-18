'use strict';

module.exports = ['$http', '$location', function($http, $location) {

    var chatService = {

        connected: false,
        websocket: undefined,
        connect: function(authcode) {

            chatService.websocket = new WebSocket('ws:\\\\127.0.0.1:9001');
            chatService.websocket.onopen = function(){
                var send = {"task": 'auth', "code": authcode};
                chatService.websocket.send(JSON.stringify(send));
            };

            chatService.websocket.onmessage = function(e){
                chatService.callbacks.forEach(function(o, i) {
                    o(e);
                });
            }

        },
        send: function(conversationID, content) {
            chatService.websocket.send(JSON.stringify({
                "task":"msg",
                "id":conversationID,
                "message":content}));
        },
        callbacks: [],
        listen: function(callback) {
            chatService.callbacks.push(callback);
        }

    };

    return chatService;

}];