angular.module('dropInApp')
.controller('dropInApp.controllers.aboutController', ['$scope', 'dropInApp.services.api',
		
	function($scope, api) {
  		
  		api.get('/about')
  			.then(function(result) {
  				var owners = [];
  				result.data.forEach(function (owner) {
  					owners.push(owner.name);
  				})
  				$scope.owners = owners;
  			}, function (error) {
  				console.log(error);
  			});	
	}
]);