(function () {
    'use strict';
    
    angular
        .module('petStore.shoppingCart')
        .config(Config);
            
    Config.$inject = ['$stateProvider'];
    
    function Config($stateProvider) {
        $stateProvider
            .state('shoppingCart', {
                url: '/shoppingCart',
                controller: 'ShoppingCartController',
                controllerAs: 'vm',
                templateUrl: 'components/shoppingCart/shopping-cart.html'
            });
    }
}());