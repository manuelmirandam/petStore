(function () {
    'use strict';

    angular
        .module('petStore.shoppingCart.services', [])
        .factory('ShoppingCartService', ShoppingCartService);

    ShoppingCartService.$inject = ['constants', '$resource'];

    function ShoppingCartService(constants, $resource) {
        return $resource(constants.API_URL + 'cartItems/:cartItemId', {
            cartItemId: '@_id'            
        }, {
            'update': {
                method: 'PUT'
            }
        });
    }
}());
