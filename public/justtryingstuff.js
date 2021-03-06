

// public/core.js
var vertaYak = angular.module('vertaYak', ['ngMaterial']);

function AppCtrl($scope, socket){
	socket.on('please_update_now', function(){
		console.log('reached the socket in app ctrl');
	});
	
}

// Needed to config the theme
vertaYak.config(function ($mdThemingProvider) {
    $mdThemingProvider
        .theme('default')
        .primaryPalette('orange')
        .accentPalette('pink')
        .warnPalette('red')
        .backgroundPalette('blue-grey')
})

// Needed to create the socket
vertaYak.factory('socket', function ($rootScope) {
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

vertaYak.controller('AppCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

}]);

vertaYak.controller('mainController', ['$scope', '$http', 'socket', function ($scope, $http, socket) {
    $scope.formData = {};

    socket.on('please_update_now', function () {
        console.log("reached socket.");
        // get all messages and show them
        $http.get('/api/messages')
            .success(function (data) {
                $scope.messages = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    });

    // get all messages and show them
    $http.get('/api/messages')
        .success(function (data) {
            $scope.messages = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // when submitting the form, send the text to the node API
    $scope.createMessage = function () {
        //send the text to the node API
        $http.post('/api/messages', $scope.formData)
            .success(function (data) {
                // clear the form, allowing the user to send more messages
                $scope.formData = {};
                $scope.messages = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
	
	$scope.upVote = function (id) {
		$http.post('/api/upvote/' + id)
			.success(function (data) {
				//Mark and don't let user click again
				console.log("UpVoted!");
				console.log(data);
			})
			.error(function (data){
				console.log("Upvote error.");
				console.log(data);
			});
	};
	
	$scope.downVote = function (id) {
		$http.post('/api/downvote/' + id)
			.success(function (data) {
				//Mark and don't let user click again
				console.log("DownVoted!");
				console.log(data);
			})
			.error(function (data){
				console.log("Down vote error.");
				console.log(data);
			});
	};

}]);