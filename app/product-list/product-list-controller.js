'use strict';

app.controller('ProductListCtrl', function(products){
	var that = this;

	products.forEach( function(product){
		var avg = product.reviews.reduce(function(sum, review) {
			return sum + review.rate.length
		}, 0)/(product.reviews.length||1);
		product.avgRating = avg;
	});

	this.products = products;
	this.brands = ['Brand1', 'Brand2', 'Brand3', 'None'];
	this.ratings = ['1','2','3','4','5'];

	this.setBrand = function(brand){ that.brand = brand; };

	this.brandFilter = function(product) {
		if (!that.brand || that.brand === 'None') return product;
		return product.brand == that.brand;
	};

	this.setRating = function(rating){ that.rating = 0 || rating; };

	this.ratingFilter = function(product) {
		if (!that.rating || that.rating === 'All') return product;
		return Math.floor(product.avgRating) == that.rating;
	};

	this.productFilter = function(product){
		return that.ratingFilter(product) && that.brandFilter(product);
	}

});