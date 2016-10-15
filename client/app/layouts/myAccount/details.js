angular.module('dropInApp')
.controller('dropInApp.controllers.myAccountDetailsController', ['$scope', 'dropInApp.services.api',
		
	function($scope, api) {
  		
  		api.get('/about/details/1')
  			.then(function(result) {
          console.log(result);
          $scope.name = result.data.name;
          $scope.address = result.data.address;
          $scope.country = result.data.country;
          $scope.email = result.data.email;
  			}, function (error) {
  				console.log(error);
  			});	
	}
]);