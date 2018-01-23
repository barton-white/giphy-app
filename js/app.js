var gifApp = angular.module('gifApp', ['ngRoute', 'ngResource']);

//routing
gifApp.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'pages/main.html',
			controller: 'mainCtrl'
		})
        .when('/page-two',{
			templateUrl: 'pages/pagetwo.html',
			controller: 'mainCtrl'
		});
});
