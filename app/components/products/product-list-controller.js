'use strict';

app.controller('ProductListCtrl', function(products, ProductsService){
  
  this.filter = ProductsService.filter;
  
  if (!this.filter.brand && !this.filter.rating) {
    this.products = products;
  } else {
    this.products = ProductsService.filterProducts(this.filter);
  }
  
  this.brands = ['Generic', 'Heinz', 'Boar\'s Head'];
  this.ratings = ['1','2','3','4','5'];

  this.filterProducts = function(filter){
    this.products = ProductsService.filterProducts(filter);
  }

});