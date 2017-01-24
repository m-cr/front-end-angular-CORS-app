'use strict';

var states = ['$stateProvider', function($stateProvider) { 
  $stateProvider
    .state('home', {
      url: '/',
      template: '<div class="well"><login></login></div>'
    })
    .state('productList', {
      url: '/products',
      templateUrl: 'components/products/product-list.html',
      controller: 'ProductListCtrl as list',
      resolve: {
        products: function (ProductService) {
          return ProductService.fetchAll();
        }
      }
    })
    .state('productDetail', {
      url: '/products/:id',
      templateUrl: 'components/products/product-detail.html',
      resolve: {
        product: function (ProductService, $stateParams) {
          return ProductService.fetchOne($stateParams.id);
        }
      },
      controller: function(product){
        this.product = product;
      },
      controllerAs: 'detail'
    });
}]

app.config(states);