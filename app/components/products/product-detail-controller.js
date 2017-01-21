'use strict';

app.controller('ProductDetailCtrl', function(product, ProductsService){
	this.product = product;
	this.product.categories = product.categories.map( function(category) {return category.name});
});

