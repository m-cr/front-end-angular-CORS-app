'use strict';

app.factory('ProductService',['$http', function($http){
  var ProductService = {};
  var products = [];
  ProductService.filter = {};
  
  ProductService.filterProducts = function(filter){
    if (filter !== ProductService.filter) angular.copy(filter, ProductService.filter);

    var filteredProducts = products.filter(function(product){
      if (filter.brand) return product.brand === filter.brand;
      return true;
    }).filter(function(product){
      if(filter.rating) return Math.floor(product.avgRating) == filter.rating;
      return true;
    });

    return filteredProducts;
  }

  ProductService.fetchAll = function(){
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
      angular.copy(response.data, products);
      return products;
    });
  }

  ProductService.fetchOne = function(id){
    return $http({
      method: 'GET',
      url: 'http://localhost:3005/api/products/' + id
    })
    .then(function(response){
      var product = response.data;
      console.log(product);
      product.categories = product.categories.map( function(category) {return category.name});
      product.avgRating = product.reviews.reduce(function(sum, review) {
          return sum + review.rate.length 
      }, 0)/(product.reviews.length||1);
      return product;
    });
  }

  return ProductService;
}]);