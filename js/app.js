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
        .when('/search/:term/:page',{
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
    
    $scope.$watch('searchInput', function(){
            searchData.searchTerm = $scope.searchInput;
    });
    
    $scope.submit = function(){
        $location.path("/search/" + searchData.searchTerm);
        //$log.log(searchData.searchTerm);
    };
    
}]);
                                 
gifApp.controller('resultCtrl', ['$scope', '$log', '$resource', '$routeParams', function($scope, $log, $resource, $routeParams){
    $scope.pageNumber = Number($routeParams.page) || 1;
    $scope.searchTerm = $routeParams.term;
    $scope.randomGif = $resource('http://api.giphy.com/v1/gifs/search');
    $scope.gifResult = $scope.randomGif.get({api_key: 'U7FFjpMhs2ewS7hvDwcBmf3gS1cSgvbq', q: $scope.searchTerm, limit: 24});
    
    $scope.firstSet = function(v,i,a){
        var l = a.length;
        if(i < Math.floor(l/3)){
//            $log.log("1st: " + i);
            return true;
        } else {
            return false;
        }          
    }
    $scope.secondSet = function(v,i,a){
        var l = a.length;
        if(i >= Math.floor(l/3) && i < Math.floor(l/3)*2){
//            $log.log("2nd: " + i);
            return true;
        } else {
            return false;
        }          
    }
    $scope.thirdSet = function(v,i,a){
        var l = a.length;
        if(i >= Math.floor(l/3)*2 && i < l){
//            $log.log("3rd: " + i);
            return true;
        } else {
            return false;
        }          
    }
    
    
    //api_key: 'U7FFjpMhs2ewS7hvDwcBmf3gS1cSgvbq'
    
}]);