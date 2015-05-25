var app = angular.module("aniop", ['ngRoute'])
    .config(function ($sceDelegateProvider) {
	    $sceDelegateProvider.resourceUrlWhitelist([
		    'self',
		    'http://openings.moe/**'
	    ]);
    })
    .config(function ($routeProvider) {
        $routeProvider
        	.when('/', {
        		controller: 'MainController',
        		templateUrl: 'views/home.html'
        	})
        	.when('/video/:file', {
        		controller: 'MainController',
        		templateUrl: 'views/home-specific.html'
        	})
        	.when('/list', {
        		controller: 'ListController',
        		templateUrl: 'views/list.html'
        	})
        	.otherwise({
        		redirectTo:'/'
        	});
    });