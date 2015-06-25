// public/core.js
var vertaYak = angular.module('vertaYak', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all messages and show them
	//gets message from node 
    $http.get('/api/messages')
        .success(function(data) {
            $scope.messages = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createMessage = function() {
		//send the text to node
        $http.post('/api/messages', $scope.formData)
            .success(function(data) {
				// clear the form, allowing the user to send more messages
                $scope.formData = {}; 
                $scope.messages = data;
                console.log(data);
            })
            .error(function(data) {
				//this should not happen
                console.log('Error: ' + data);
            });
    };

}