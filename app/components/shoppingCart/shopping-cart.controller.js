(function () {
    'use strict';
    
    angular
        .module('petStore.controllers')
        .controller('ShoppingCartController', ShoppingCartController);
    
    ShoppingCartController.$inject = ['ShoppingCartService', 'ProductService', '$location', '$anchorScroll', '$route', '$cacheFactory'];
    
    function ShoppingCartController(ShoppingCartService, ProductService, $location, $anchorScroll, $route, $cacheFactory) {
        var vm = this;
        
        vm.shoppingCartList = [];
        vm.summary = {
            subtotal: 0,
            shipping: 0,
            tax: 0,
            total: 0
        };
        
        vm.deleteProductFromCart = deleteProductFromCart;
        vm.quantityChange = quantityChange;
        vm.checkout = checkout;
        
        $anchorScroll();
        getShoppingCartItems();
        
        /*
         * Get all shopping cart items and loop the array to pull the product data
         */
        function getShoppingCartItems() {
            var dataCache = $cacheFactory.get('shoppingCartCache');
            // Let's validate if the cache object exists, if not, we create the cache object.
            if (!dataCache) {
                dataCache = $cacheFactory('shoppingCartCache');
            }
            
            var shoppingCartItemsFromCache = dataCache.get('shoppingCartItems');
            if (shoppingCartItemsFromCache) {
                vm.shoppingCartList = shoppingCartItemsFromCache;
            } else {
                var shoppingCartList = [];
                ShoppingCartService.getAll().$loaded()
                    .then(function (shopingCartItems) {
                        angular.forEach(shopingCartItems, function (item) {
                            ProductService.getById(item.$id).$loaded()
                                .then(function (x) {
                                    x.quantity = item.quantity;
                                    x.subtotal = item.quantity * x.unitPrice;
                                    shoppingCartList.push(x);
                                    updateShoppingCartSummary();
                                });
                        });
                        
                        dataCache.put('shoppingCartItems', shoppingCartList);
                        vm.shoppingCartList = shoppingCartList;
                    });
            }
        }
                        
        function deleteProductFromCart(product, index) {
            ShoppingCartService.deleteById(product)
                .then(function () {
                    ShoppingCartService.deleteItemsFromCache();
                    $route.reload();
                });
        }
                
        /*
         * Method to update the shopping cart summary when a product qty change
         */
        function quantityChange(product) {
            product.quantity = product.quantity !== undefined ? product.quantity : product.stock;
            product.subtotal = product.quantity * product.unitPrice;
            ShoppingCartService.addToCart(product);
            updateShoppingCartSummary();
        }
                            
        /*
         * Simulates a checkout and place order process, it subastracts the product quantity from the product stock
         */
        function checkout() {
            angular.forEach(vm.shoppingCartList, function (product) {
                product.stock -= product.quantity;
                ProductService.update(product);
                ShoppingCartService.deleteById(product);
            });
            
            $location.path('/productList');
        }
        
        /*
         * Method to update the shopping cart summary when occurs a delete or update in the cart
         */
        function updateShoppingCartSummary() {
            vm.summary.subtotal = 0;
            angular.forEach(vm.shoppingCartList, function (value) {
                vm.summary.subtotal += value.subtotal;
            });

            // Once we hace the subtotal, we calculate the tax and shipping
            vm.summary.shipping = vm.summary.subtotal * 0.10;
            vm.summary.tax = vm.summary.subtotal * 0.15;
            vm.summary.total = vm.summary.subtotal + vm.summary.tax + vm.summary.shipping;
        }
    }
}());