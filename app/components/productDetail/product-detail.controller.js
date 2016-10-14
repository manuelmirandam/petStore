(function () {
    'use strict';

    angular
        .module('petStore.productDetail.controllers', [])
        .controller('ProductDetailController', ProductDetailController);

    ProductDetailController.$inject = ['$stateParams', 'ProductService', 'ShoppingCartService', 'ShoppingCartHelper', '$state', '$anchorScroll'];

    function ProductDetailController($stateParams, ProductService, ShoppingCartService, ShoppingCartHelper, $state, $anchorScroll) {
        var vm = this;
        vm.quantity = 1;
        vm.recommendedProducts = [];
        vm.addToCart = addToCart;

        activate();
        $anchorScroll();

        function activate() {
            ProductService.get({
                    productId: $stateParams.productId
                }).$promise
                .then(function (product) {
                    vm.product = product;

                    ProductService.query({
                            categoryId: product.categoryId
                        }).$promise
                        .then(function (products) {
                            vm.recommendedProducts = products.filter(function (x) {
                                return x._id !== vm.product._id;
                            });
                        });
                });
        }

        /*
         * Method to a add a product in the shopping cart
         */
        function addToCart() {
            ShoppingCartService.query({ productId: vm.product._id, userId: 1 }).$promise
                .then(function (cartItems) {
                    var cartItem = cartItems[0];

                    if (cartItem) {
                        cartItem.quantity = vm.quantity;
                        ShoppingCartService.update({ cartItemId: cartItem._id } , cartItem).$promise
                            .then(onSuccess, onError);
                    } else {
                        cartItem = {
                            quantity: vm.quantity,
                            productId: vm.product._id,
                            userId: 1 // Needs to be changed
                        };

                        ShoppingCartService.save(cartItem).$promise
                            .then(onSuccess, onError);
                    }
                });
        }
        
        function onSuccess(cartItem) {
            ShoppingCartHelper.deleteItemsFromCache();
            $state.go('shoppingCart');
        }
        
        function onError(err) {
            // Log errors here
        }
    }
}());
