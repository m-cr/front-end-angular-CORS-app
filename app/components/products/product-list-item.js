'use strict';

app.directive('productListItem', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/products/product-list-item.html'
	}
});