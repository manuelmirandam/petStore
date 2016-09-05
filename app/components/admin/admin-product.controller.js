(function () {
    'use strict';
    
    angular
        .module('petStore.controllers')
        .controller('AdminProductController', AdminProductController);
    
    AdminProductController.$inject = ['ProductService', 'ShoppingCartService', '$anchorScroll'];
    
    function AdminProductController(ProductService, ShoppingCartService, $anchorScroll) {
        var vm = this;
        vm.deleteProduct = deleteProduct;
        
        $anchorScroll();
        getAllProducts();
        
        function getAllProducts() {
            ProductService.getAll().$loaded()
                .then(function (products) {
                    vm.products = products;
            });
        }
        
        function deleteProduct(product, index) {
            ProductService.deleteProduct(product);
            ShoppingCartService.deleteById(product);
        }
    }
    
}());