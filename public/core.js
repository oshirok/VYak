// public/core.js
var vertaYak = angular.module('vertaYak', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // get all messages and show them
    $http.get('/api/messages')
        .success(function(data) {
            $scope.message = data;
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
                $scope.message = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}