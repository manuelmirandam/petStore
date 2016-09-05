(function () {
    'use strict';
    
    angular
        .module('petStore.controllers')
        .controller('ProductListController', ProductListController);
    
    ProductListController.$inject = ['ProductService', '$routeParams', '$filter', '$anchorScroll'];
    
    function ProductListController(ProductService, $routeParams, $filter, $anchorScroll) {
        var vm = this;
        vm.staticContent = {
            limit: 8,
            loadMoreLabel: 'Load more',
            loadMoreIcon: 'fa fa-plus',
            numberOfColumns: 4
        };
        
        vm.loadMoreProducts = loadMoreProducts;
        vm.allProductsClick = allProductsClick;
        
        $anchorScroll();
        getAllProducts();
         
        function getAllProducts() {
            ProductService.getAll().$loaded().then(function (products) {
                if ($routeParams.filterLbl === "cat") {
                    vm.products = $filter('filter')(products, { categoryId: $routeParams.filterVal });
                } else if ($routeParams.filterLbl === "animal") {
                    vm.products = $filter('filter')(products, { animalId: $routeParams.filterVal });
                } else if ($routeParams.filterLbl === "search") {
                    vm.products = $filter('filter')(products, { $: $routeParams.filterVal });
                } else {
                    vm.products = products;
                }
                verifyProductLimit();
            });
        }
        
        function verifyProductLimit() {
            if (vm.staticContent.limit >= vm.products.length) {
                vm.staticContent.loadMoreLabel = 'No more products';
                vm.staticContent.loadMoreIcon = '';
                return;
            }
        }
        
        function allProductsClick() {
            ProductService.getAll().$loaded()
                .then(function (products) {
                    vm.products = products;
                    vm.staticContent.limit = vm.products.length;
                    verifyProductLimit();
            });
        }
        
        function loadMoreProducts() {
            vm.staticContent.limit += vm.staticContent.numberOfColumns;
            verifyProductLimit();
        }
    }
}());