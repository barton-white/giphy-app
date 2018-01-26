var gifApp = angular.module('gifApp', ['ngRoute', 'ngResource']);

//routing
gifApp.config(function($routeProvider, $sceDelegateProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'pages/main.html',
			controller: 'mainCtrl'
		})
        .when('/search',{
			templateUrl: 'pages/search.html',
			controller: 'resultCtrl'
		})
        .when('/search/:term',{
			templateUrl: 'pages/search.html',
			controller: 'resultCtrl'
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

//services
gifApp.service('searchData', function(){
    this.searchTerm = '';
});

gifApp.directive('searchResult', function(){
    return {
        templateUrl: 'directives/search-result.html',
        replace: true,
        scope: {
            result: '='
        }
    }
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

gifApp.controller('searchCtrl', ['$scope', '$log', '$location', 'searchData', function($scope, $log, $location, searchData){
    
    $scope.searchInput = "";
    $log.log("test");
    $scope.$watch('searchInput', function(){
            searchData.searchTerm = $scope.searchInput;
            $log.log($scope.searchInput);
    });
    
    $scope.submit = function(){
        $location.path("/search/" + searchData.searchTerm);
        //$log.log(searchData.searchTerm);
    };
    
}]);
                                 
gifApp.controller('resultCtrl', ['$scope', '$log', '$resource', '$routeParams', function($scope, $log, $resource, $routeParams){
    var resultTerm = $routeParams.term;
    
    $scope.randomGif = $resource('http://api.giphy.com/v1/gifs/search');
    //, {callback: "JSON_CALLBACK"}, { get: {method: "JSONP"}});
    
    //local test 
    //$scope.randomGif = $resource('random.json');
    
    $scope.gifResult = $scope.randomGif.get({api_key: 'U7FFjpMhs2ewS7hvDwcBmf3gS1cSgvbq', q: resultTerm});
    
    $log.log($scope.gifResult);
    //api_key: 'U7FFjpMhs2ewS7hvDwcBmf3gS1cSgvbq'
    
}]);