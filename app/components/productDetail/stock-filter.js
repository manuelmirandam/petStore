(function () {
    'use strict'
    
    angular.module('petStore.filters', [])
        .filter('stock', function () {
            return function (stock) {
                return stock > 0 ? "In stock" : "Sold out";
            };
        });
}());