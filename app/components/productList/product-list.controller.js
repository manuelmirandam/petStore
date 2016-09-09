(function () {
    'use strict';
    
    angular
        .module('petStore.productList.controllers', [])
        .controller('ProductListController', ProductListController);
    
    ProductListController.$inject = ['ProductService', '$stateParams', '$filter', '$anchorScroll', 'constants'];
    
    function ProductListController(ProductService, $stateParams, $filter, $anchorScroll, constants) {
        var vm = this;
        vm.staticContent = {
            limit: 8,
            loadMoreLabel: constants.LOAD_MORE,
            loadMoreIcon: constants.LOAD_MORE_ICON,
            numberOfColumns: 4
        };
        
        vm.loadMoreProducts = loadMoreProducts;
        vm.allProductsClick = allProductsClick;
        
        activate();
        $anchorScroll();
                 
        function activate() {
            // Load and filter produts depending on the searching criteria
            ProductService.getAll().$loaded().then(function (products) {
                if ($stateParams.filterLbl === "cat") {
                    vm.products = $filter('filter')(products, { categoryId: $stateParams.filterVal });
                } else if ($stateParams.filterLbl === "animal") {
                    vm.products = $filter('filter')(products, { animalId: $stateParams.filterVal });
                } else if ($stateParams.filterLbl === "search") {
                    vm.products = $filter('filter')(products, { $: $stateParams.filterVal });
                } else {
                    vm.products = products;
                }
                verifyProductLimit();
            });
        }
        
        /*
         * Verify whether there are more products available to display
         */
        function verifyProductLimit() {
            if (vm.staticContent.limit >= vm.products.length) {
                vm.staticContent.loadMoreLabel = constants.NO_MORE_PRODUCTS;
                vm.staticContent.loadMoreIcon = '';
                return;
            }
        }
        
        /*
         * Display all products on the screen
         */
        function allProductsClick() {
            ProductService.getAll().$loaded()
                .then(function (products) {
                    vm.products = products;
                    vm.staticContent.limit = vm.products.length;
                    verifyProductLimit();
                });
        }
        
        /*
         * Load a new row of products on the screen
         */
        function loadMoreProducts() {
            vm.staticContent.limit += vm.staticContent.numberOfColumns;
            verifyProductLimit();
        }
    }
}());