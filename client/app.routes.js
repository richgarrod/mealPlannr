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
