'use strict';

app.controller('ProductListCtrl', ['products', 'ProductService', function(products, ProductService){
  
  this.filter = ProductService.filter;
  
  if (!this.filter.brand && !this.filter.rating) {
    this.products = products;
  } else {
    this.products = ProductService.filterProducts(this.filter);
  }
  
  this.brands = ['Generic', 'Heinz', 'Boar\'s Head'];
  this.ratings = ['1','2','3','4','5'];

  this.filterProducts = function(filter){
    this.products = ProductService.filterProducts(filter);
  }

}]);
