(function () {
    'use strict';
    
    angular
        .module('petStore.controllers')
        .controller('ProductDetailController', ProductDetailController);
    
    ProductDetailController.$inject = ['$stateParams', 'ProductService', 'ShoppingCartService', '$state', '$anchorScroll', '$log'];
    
    function ProductDetailController($stateParams, ProductService, ShoppingCartService, $state, $anchorScroll, $log) {
        var vm = this;
        vm.quantity = 1;
        vm.product = ProductService.getById($stateParams.productId);
        vm.recommendedProducts = [];
        vm.addToCart = addToCart;
                      
        $anchorScroll();
        getRecommendedProducts();
        
        /*
         * Method to a add a product in the shopping cart
         */
        function addToCart() {
            vm.product.quantity = vm.quantity;
            ShoppingCartService.addToCart(vm.product);
            ShoppingCartService.deleteItemsFromCache();
            $state.go('shoppingCart');
        }
        
        function getRecommendedProducts() {
            ProductService.getAll().$loaded()
                .then(function (products) {
                    vm.recommendedProducts = products.filter(function (x) {
                        return x.categoryId === vm.product.categoryId && x.$id !== vm.product.$id;
                    });
                });
        }
    }
}());