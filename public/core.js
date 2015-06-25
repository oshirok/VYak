// public/core.js
var vertaYak = angular.module('vertaYak', []);

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

function mainController($scope, $http, socket) {
    $scope.formData = {};
	
	socket.on('please_update_now', function (){
		console.log("reached socket.");
	});

    // get all messages and show them
    $http.get('/api/messages')
        .success(function(data) {
            $scope.messages = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the form, send the text to the node API
    $scope.createMessage = function() {
		//send the text to the node API
        $http.post('/api/messages', $scope.formData)
            .success(function(data) {
				// clear the form, allowing the user to send more messages
                $scope.formData = {}; 
                $scope.messages = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}