'use strict';

app.factory('ProductsService', function($http){
  var ProductsService = {};
  var products = [];
  ProductsService.filter = {};
  
  ProductsService.filterProducts = function(filter){
    if (filter !== ProductsService.filter) angular.copy(filter, ProductsService.filter);

    var filteredProducts = products.filter(function(product){
      if (filter.brand) return product.brand === filter.brand;
      return true;
    }).filter(function(product){
      if(filter.rating) return Math.floor(product.avgRating) == filter.rating;
      return true;
    });

    return filteredProducts;
  }

  ProductsService.fetchAll = function(){
    return $http({
      method: 'GET',
      url: 'http://localhost:3005/api/products'
    })
    .then(function(response){
      response.data.forEach(function(product){
        product.categories = product.categories.map(function(category){return category.name});
        product.avgRating = product.reviews.reduce(function(sum, review) {
          return sum + review.rate.length 
        }, 0)/(product.reviews.length||1);
      });
      console.log('fetching all');
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
      return response.data;
    });
  }

  return ProductsService;
});