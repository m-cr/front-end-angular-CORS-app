'use strict';

app.factory('ProductsService', function($http){
	var ProductsService;

	ProductsService.fetchAll = function(){
		return $http.get(CORS);
	}

	ProductsService.fetchOne = function(id){
		return $http.get(CORS);
	}

	return ProductsService;
});