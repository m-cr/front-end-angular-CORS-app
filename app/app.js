'use strict'

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider){
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'home.html',
		controller: 'LogInCtrl as logIn'
	});
});

app.config(function($stateProvider){	
	$stateProvider.state('productList', {
		url: '/products',
		templateUrl: 'product-list/product-list.html',
		controller: 'ProductListCtrl as list',
		resolve: {
			products: function (ProductsService) {
				return ProductsService.fetchAll();
			}
		}
	})
});

app.config(function($stateProvider){
	$stateProvider.state('productDetail', {
		url: '/products/:id',
		templateUrl: 'product-detail/product-detail.html',
		controller: 'ProductDetailCtrl as detail',
		resolve: {
			product: function (ProductsService, $stateParams) {
				return ProductsService.fetchOne($stateParams.id);
			}
		}
	});
});

app.config(function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	
	$httpProvider.interceptors.push(['$q', '$location', '$window', function ($q, $location, $window) {
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

});
