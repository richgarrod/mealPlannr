angular.module('dropInApp')
.controller('dropInApp.controllers.myAccountDropInsController', ['$scope', 'dropInApp.services.api',
		
	function($scope, api) {
  		
  		api.get('/about/dropIns/1')
  			.then(function(result) {
          console.log(result);
          $scope.dropIns = result.data;
  			}, function (error) {
  				console.log(error);
  			});	
	}
]);