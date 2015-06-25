// public/core.js
var vertaYak = angular.module('vertaYak', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all messages and show them
    $http.get('/api/message')
        .success(function(data) {
            $scope.message = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createMessage = function() {
        $http.post('/api/message', $scope.formData)
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