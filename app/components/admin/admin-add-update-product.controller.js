(function () {
    'use strict';
    
    angular
        .module('petStore.controllers')
        .controller('AdminAddUpdateProductController', AdminAddUpdateProductController);
    
    AdminAddUpdateProductController.$inject = ['$scope', '$location', 'ProductService', 'Product', '$anchorScroll'];
    
    function AdminAddUpdateProductController($scope, $location, ProductService, Product, $anchorScroll) {
        var vm = this;
        vm.product = Product;
        vm.uploadFile = uploadFile;
        vm.saveProduct = saveProduct;
        vm.reset = reset;
        
        $anchorScroll()
        
        /*
         * Method to put the file name into the input text for the image
         */
        function uploadFile() {
            $scope.$apply(function () {
                var filename = event.target.files[0].name;
                vm.product.imgPath = filename;
            });
        }
        
        function saveProduct(product) {
            if (vm.productForm.$valid) {
                if (product.$id !== undefined && product.$id !== "") {
                    ProductService.update(product);
                } else {
                    ProductService.save(product);
                }

                $location.path('/adminProduct');
            }
        }
                        
        function reset() {
            vm.product = {};
            vm.productForm.$setPristine();            
            vm.productForm.$setUntouched();
        }
    }
}());