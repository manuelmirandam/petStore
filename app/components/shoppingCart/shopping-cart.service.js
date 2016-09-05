(function () {
    'use strict';
    
    angular
        .module('petStore.services')
        .factory('ShoppingCartService', ShoppingCartService);
        
    ShoppingCartService.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseUrl', '$cacheFactory'];
    
    function ShoppingCartService($firebaseArray, $firebaseObject, firebaseUrl, $cacheFactory) {
        var shoppingRef = new Firebase(firebaseUrl + 'shoppingCart');
        var shoppingCartService = {
            addToCart: addToCart,
            getAll: getAll,
            deleteById: deleteById,
            deleteItemsFromCache: deleteItemsFromCache
        };
            
        return shoppingCartService;

        /*
         * Method to add/update a product to the cart
         */
        function addToCart(product) {
            shoppingRef.child(product.$id).set({
                quantity: product.quantity
            });
        }

        /*
         * Method to get all products from shopping cart
         */
        function getAll() {
            return $firebaseArray(shoppingRef);
        }

        /*
         * Method to delete a product from the shopping cart
         */
        function deleteById(product) {
            return $firebaseObject(shoppingRef.child(product.$id)).$remove();
        }
        
        /*
         * Method to delete shopping cart items from cache once shopping cart has been updated
         */
        function deleteItemsFromCache() {
            var dataCache = $cacheFactory.get('shoppingCartCache');
            dataCache.remove('shoppingCartItems');
        }
    }
}());
                 