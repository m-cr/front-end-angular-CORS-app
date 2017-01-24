'use strict'

var app = angular.module('app', ['ui.router']);

var MainCtrl = ['$scope', '$window', '$state', '$rootScope', function($scope, $window, $state, $rootScope){
	if ($window.localStorage.token){
		$scope.loggedIn = true;
	} else { $scope.loggedIn = false}
	
	$scope.$on('loggedIn', function(){
		$scope.loggedIn = true;
	});
	$scope.$on('loggedOut', function(){
		$scope.loggedIn = false;
	});

	$scope.logOut = function(){
		$window.localStorage.removeItem('token');
		$rootScope.$broadcast('loggedOut');
		$state.go('home');
	}
}]

var customInterceptor = ['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push(['$location', '$q','$window', function ($q, $location, $window) {
		return {
			'request': function (config) {
				config.headers = config.headers || {};
				if ($window.localStorage.token) {
					config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
				}
				return config;
			},
			'responseError': function (response) {
				if (response.status === 401 || response.status === 403) {
					$location.path('/home');
				}
				return $q.reject(response);
			}
		};
	}]);
}]


app.controller('MainCtrl', MainCtrl)
	.config(customInterceptor);
