(function () {
    'use strict';
    
    angular
        .module('petStore.controllers')
        .controller('AdminProductController', AdminProductController);
    
    AdminProductController.$inject = ['ProductService', 'ShoppingCartService', '$anchorScroll', '$state'];
    
    function AdminProductController(ProductService, ShoppingCartService, $anchorScroll, $state) {
        var vm = this;
        vm.deleteProduct = deleteProduct;
        
        $anchorScroll();
        getAllProducts();
        
        /*
         * Method to get all products from db
         */
        function getAllProducts() {
            ProductService.getAll().$loaded()
                .then(function (products) {
                    vm.products = products;
                });
        }
        
        /*
         * Method to delete a product from db
         */
        function deleteProduct(product, index) {
            ProductService.deleteProduct(product);
            ShoppingCartService.deleteById(product)
                .then(function () {
                    ShoppingCartService.deleteItemsFromCache();
                });
            $state.reload();
        }
    }
    
}());