'use strict';

console.log('service');

app.factory('ProductsService', function($http){
	var ProductsService = {};
	var products = [];

	ProductsService.fetchAll = function(){
		return $http({
			method: 'GET',
			url: 'http://localhost:3005/api/products'
		})
		.then(function(response){
			console.log(response.data);
			angular.copy(response.data, products);
			return products;
		});
	}

	ProductsService.fetchOne = function(id){
		return $http({
			method: 'GET',
			url: 'http://localhost:3005/api/products/' + id
		})
		.then(function(response){
			console.log(response.data);
			return response.data;
		});
	}

	return ProductsService;
});