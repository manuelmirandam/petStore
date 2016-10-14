(function () {
    'use strict';

    angular
        .module('petStore.admin.controllers')
        .controller('AdminProductController', AdminProductController);

    AdminProductController.$inject = ['ProductService', 'ShoppingCartService', '$anchorScroll', '$state'];

    function AdminProductController(ProductService, ShoppingCartService, $anchorScroll, $state) {
        var vm = this;
        vm.deleteProduct = deleteProduct;

        $anchorScroll();
        activate();

        function activate() {
            ProductService.query().$promise.then(function (products) {
                vm.products = products;
            });
        }

        /*
         * Method to delete a product from db
         */
        function deleteProduct(product, index) {
            ProductService.delete({ productId: product._id })
                .$promise.then(function () {
                /*ShoppingCartService.deleteById(product)
                    .then(function () {
                        ShoppingCartService.deleteItemsFromCache();
                });*/
                $state.reload();
            });
        }
    }
}());
