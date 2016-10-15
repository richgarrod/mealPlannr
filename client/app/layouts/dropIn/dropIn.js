angular.module('dropInApp')
.controller('dropInApp.controllers.dropInController', ['$scope', 'dropInApp.services.api',
		
	function($scope, api) {
  		
  		api.get('/boxes')
  			.then(function(result) {
          console.log(result);
  				$scope.boxes = result.data;
  			}, function (error) {
  				console.log(error);
  			});	

        $scope.dropIn = function (box) {
          alert("Then go drop in to " + box.name + " at " + box.address);
        };
	}
]);