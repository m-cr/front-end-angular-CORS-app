'use strict';

var app = angular.module('app', ['ui.router'])
	.config(function($stateProvider){
		$stateProvider.state('home', {
			url: '/',
			templateUrl: '/home.html'
		})
		.state('productList', {
			url: '/products',
			templatUrl: 'product-list/product-list.html',
			controller: 'ProductListCtrl',
			resolve: {
				products: function (ProductsService) {
					return ProductsServices.fetchAll();
				}
			}
		})
		.state('productDetail', {
			url: '/products/:id',
			templateUrl: 'product-detail/product-detail.html',
			controller: 'ProductDetailCtrl',
			resolve: {
				product: function (ProductSservice, $stateParams) {
					return ProductsServices.fetchOne($stateParams.id);
				}
			}
		});
	});