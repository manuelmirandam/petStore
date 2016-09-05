(function () {
    'use strict';
    
    angular
        .module('petStore.controllers')
        .controller('ProductDetailController', ProductDetailController);
    
    ProductDetailController.$inject = ['$routeParams', 'ProductService', 'ShoppingCartService', '$location', '$anchorScroll', '$log'];
    
    function ProductDetailController($routeParams, ProductService, ShoppingCartService, $location, $anchorScroll, $log) {
        var vm = this;
        vm.quantity = 1;
        vm.product = ProductService.getById($routeParams.productId);
        vm.recommendedProducts = [];
        vm.addToCart = addToCart;
                      
        $anchorScroll();
        getRecommendedProducts();
        
        function addToCart() {
            vm.product.quantity = vm.quantity;
            ShoppingCartService.addToCart(vm.product);
            $location.path('/shoppingCart');
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