(function () {
    'use strict';
    
    angular.module('petStore.filters', [])
        .filter('stock', stock);
    
    stock.$inject = ['constants'];
    
    function stock(constants) {
        return function (stock) {
            return stock > 0 ? constants.IN_STOCK : constants.SOLD_OUT;
        };
    }
}());