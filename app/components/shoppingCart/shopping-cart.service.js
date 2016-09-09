(function () {
    'use strict';
    
    angular
        .module('petStore.shoppingCart.services', [])
        .factory('ShoppingCartService', ShoppingCartService);
        
    ShoppingCartService.$inject = ['$firebaseArray', '$firebaseObject', 'constants', '$cacheFactory'];
    
    function ShoppingCartService($firebaseArray, $firebaseObject, constants, $cacheFactory) {
        var shoppingRef = new Firebase(constants.FIREBASE_URL + 'shoppingCart');
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
            if (dataCache) {
                dataCache.remove('shoppingCartItems');
            }
        }
    }
}());
                 