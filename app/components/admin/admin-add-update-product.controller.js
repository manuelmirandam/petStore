(function () {
    'use strict';
    
    angular
        .module('petStore.admin.controllers', [])
        .controller('AdminAddUpdateProductController', AdminAddUpdateProductController);
    
    AdminAddUpdateProductController.$inject = ['$scope', '$state', 'ProductService', 'Product', '$anchorScroll'];
    
    function AdminAddUpdateProductController($scope, $state, ProductService, Product, $anchorScroll) {
        var vm = this;
        vm.product = Product;
        vm.uploadFile = uploadFile;
        vm.saveProduct = saveProduct;
        vm.reset = reset;
        
        $anchorScroll();
        
        /*
         * Method to put the file name into the input text for the image
         */
        function uploadFile() {
            $scope.$apply(function () {
                var filename = event.target.files[0].name;
                vm.product.imgPath = filename;
            });
        }
        
        /*
         * Method to save or update a product
         */
        function saveProduct(product) {
            if (vm.productForm.$valid) {                
                if (product._id !== undefined && product._id !== "") {
                    ProductService.update({ productId: product._id }, product).$promise.then(function () {
                        $state.go('adminProduct');
                    }, function (err) {
                        // Error handling
                    });
                } else {                    
                    ProductService.save(product).$promise.then(function () {
                        $state.go('adminProduct');
                    });
                }                
            }
        }
              
        /*
         * Method to reset the product form
         */
        function reset() {
            vm.product = {};
            vm.productForm.$setPristine();
            vm.productForm.$setUntouched();
        }
    }
}());