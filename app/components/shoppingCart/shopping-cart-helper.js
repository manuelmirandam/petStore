(function () {
    'use strict';
    
    angular
        .module('petStore.shoppingCart')
        .factory('ShoppingCartHelper', ShoppingCartHelper);
    
    ShoppingCartHelper.$inject = ['$cacheFactory'];
    
    function ShoppingCartHelper($cacheFactory) {
        var shoppingCartHelper = {
            deleteItemsFromCache: deleteItemsFromCache
        };
        
        return shoppingCartHelper;
        
        /*
         * Method to delete shopping cart items from cache once shopping cart has been updated
         */
        function deleteItemsFromCache() {
            var dataCache = $cacheFactory.get('shoppingCartCache');
            if (dataCache) {
                dataCache.remove('shoppingCartItems');
            }
        }
    }
    
    
}())