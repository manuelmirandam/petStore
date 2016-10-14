(function () {
    'use strict';

    angular
        .module('petStore.shoppingCart.controllers', [])
        .controller('ShoppingCartController', ShoppingCartController);

    ShoppingCartController.$inject = ['ShoppingCartService', 'ProductService', 'ShoppingCartHelper', '$state', '$anchorScroll', '$cacheFactory'];

    function ShoppingCartController(ShoppingCartService, ProductService, ShoppingCartHelper, $state, $anchorScroll, $cacheFactory) {
        var vm = this;

        vm.shoppingCartItems = [];
        vm.summary = {
            subtotal: 0,
            shipping: 0,
            tax: 0,
            total: 0
        };

        vm.deleteProductFromCart = deleteProductFromCart;
        vm.quantityChange = quantityChange;
        vm.checkout = checkout;

        activate();
        $anchorScroll();

        function activate() {
            var dataCache = $cacheFactory.get('shoppingCartCache');
            // Let's validate if the cache object exists, if not, we create the cache object.
            if (!dataCache) {
                dataCache = $cacheFactory('shoppingCartCache');
            }

            var shoppingCartItemsFromCache = dataCache.get('shoppingCartItems');
            if (shoppingCartItemsFromCache) {
                vm.shoppingCartItems = shoppingCartItemsFromCache;
            } else {
                var shoppingCartItems = [];

                // Get all shopping cart items and loop the array to pull the product data
                ShoppingCartService.query({ userId: 1 }).$promise
                    .then(function (shopingCartItems) {
                        angular.forEach(shopingCartItems, function (item) {
                            ProductService.get({ productId: item.productId }).$promise
                                .then(function (x) {                                    
                                    item.subtotal = item.quantity * x.unitPrice;
                                    item.imgPath = x.imgPath;
                                    item.name = x.name;
                                    item.shortDescription = x.shortDescription;
                                    item.stock = x.stock;
                                    item.unitPrice = x.unitPrice;
                                    shoppingCartItems.push(item);
                                    updateShoppingCartSummary();
                                });
                        });

                        dataCache.put('shoppingCartItems', shoppingCartItems);
                        vm.shoppingCartItems = shoppingCartItems;
                    });
            }
        }

        /*
         * Method to delete a product from cart/cache
         */
        function deleteProductFromCart(cartItem, index) {
            ShoppingCartService.delete({ cartItemId: cartItem._id }).$promise
                .then(function () {
                    ShoppingCartHelper.deleteItemsFromCache();
                    $state.reload();
                });
        }

        /*
         * Method to update the shopping cart summary when a product qty change
         */
        function quantityChange(cartItem) {
            cartItem.quantity = cartItem.quantity !== undefined ? cartItem.quantity : cartItem.stock;
            cartItem.subtotal = cartItem.quantity * cartItem.unitPrice;
            ShoppingCartService.update(cartItem._id, cartItem).$promise.then(function () {
                updateShoppingCartSummary();
            });
        }

        /*
         * Simulates a checkout and place order process, it subastracts the product quantity from the product stock
         */
        function checkout() {
            angular.forEach(vm.shoppingCartItems, function (cartItem) {                                                                                 
                ProductService.get({ productId: cartItem.productId}).$promise
                    .then(function (product) {
                        product.stock = product.stock - cartItem.quantity;
                        ProductService.update({ productId: product._id }, product).$promise
                            .then(function () {
                                ShoppingCartService.delete({ cartItemId: cartItem._id });
                            });                        
                    });
            });
            
            ShoppingCartHelper.deleteItemsFromCache();
            $state.go('productList');                                    
        }

        /*
         * Method to update the shopping cart summary when occurs a delete or update in the cart
         */
        function updateShoppingCartSummary() {
            vm.summary.subtotal = 0;
            angular.forEach(vm.shoppingCartItems, function (value) {
                vm.summary.subtotal += value.subtotal;
            });

            // Once we have the subtotal, we calculate the tax and shipping
            vm.summary.shipping = vm.summary.subtotal * 0.10;
            vm.summary.tax = vm.summary.subtotal * 0.15;
            vm.summary.total = vm.summary.subtotal + vm.summary.tax + vm.summary.shipping;
        }
    }
}());
