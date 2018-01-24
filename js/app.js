var gifApp = angular.module('gifApp', ['ngRoute', 'ngResource']);

//routing
gifApp.config(function($routeProvider, $sceDelegateProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'pages/main.html',
			controller: 'mainCtrl'
		})
        .when('/page-two',{
			templateUrl: 'pages/pagetwo.html',
			controller: 'mainCtrl'
		});
        
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://api.giphy.com/v1/gifs/**'
      ]);
});

//controllers
gifApp.controller('mainCtrl', ['$scope', '$log', '$resource', function($scope, $log, $resource){
    
    $scope.randomGif = $resource('http://api.giphy.com/v1/gifs/random');
    //, {callback: "JSON_CALLBACK"}, { get: {method: "JSONP"}});
    
    //local test 
    //$scope.randomGif = $resource('random.json');
    
    $scope.gifResult = $scope.randomGif.get({api_key: 'U7FFjpMhs2ewS7hvDwcBmf3gS1cSgvbq'});
    
    $log.log($scope.gifResult);
    //api_key: 'U7FFjpMhs2ewS7hvDwcBmf3gS1cSgvbq'
    
}]);