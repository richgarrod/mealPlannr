angular.module('dropInApp').service('dropInApp.services.api', ['$http', function($http) {
  
  var endPoint = 'localhost:3000';

  var apiClient = {
  	get: function (path) {
  		return $http.get(path);
  	}
  };
  return apiClient;
}]);