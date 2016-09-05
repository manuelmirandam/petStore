(function () {
    'use strict';
    
    angular
        .module('petStore.services')
        .factory('ShoppingCartService', ShoppingCartService);
        
    ShoppingCartService.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseUrl'];
    
    function ShoppingCartService($firebaseArray, $firebaseObject, firebaseUrl) {
        var shoppingRef = new Firebase(firebaseUrl + 'shoppingCart');
        var shoppingCartService = {
            addToCart: addToCart,
            getAll: getAll,
            deleteById: deleteById
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
    }
}());
                 