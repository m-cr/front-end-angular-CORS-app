'use strict';

var states = function($stateProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/components/home/home.html'
		})
		.state('productList', {
			url: '/products',
			templateUrl: 'components/products/product-list.html',
			controller: 'ProductListCtrl as list',
			resolve: {
				products: function (ProductsService) {
					return ProductsService.fetchAll();
				}
			}
		})
		.state('productDetail', {
			url: '/products/:id',
			templateUrl: 'components/products/product-detail.html',
			controller: 'ProductDetailCtrl as detail',
			resolve: {
				product: function (ProductsService, $stateParams) {
					return ProductsService.fetchOne($stateParams.id);
				}
			}
		});
}

app.config(states);