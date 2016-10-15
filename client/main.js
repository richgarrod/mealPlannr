var dropInApp = angular.module('dropInApp', ['ui.router', 'ui.bootstrap']);
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
angular.module('dropInApp').service('dropInApp.services.api', ['$http', function($http) {
  
  var endPoint = 'localhost:3000';

  var apiClient = {
  	get: function (path) {
  		return $http.get(path);
  	}
  };
  return apiClient;
}]);
angular.module('dropInApp').config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/layouts/home/home.html'
        })

        .state('about', { 
            url: '/about',
            templateUrl: 'app/layouts/about/about.html',
            controller: 'dropInApp.controllers.aboutController'
        })

        .state('myAccount', {
            url: '/myAccount',
            templateUrl: 'app/layouts/myAccount/myAccount.html',
            replace: false
        })

        .state('myAccount.details', {
            url: '/details',
            templateUrl: 'app/layouts/myAccount/details.html',
            controller: 'dropInApp.controllers.myAccountDetailsController'
        })

        .state('myAccount.dropIns', {
            url: '/dropIns',
            templateUrl: 'app/layouts/myAccount/dropIns.html',
            controller: 'dropInApp.controllers.myAccountDropInsController'
        })

        .state('dropIn', {
            url: '/dropIn',
            templateUrl: 'app/layouts/dropIn/dropIn.html',
            controller: 'dropInApp.controllers.dropInController'
        })
});
