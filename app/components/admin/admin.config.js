(function () {
    'use strict';
    
    angular
        .module('petStore.admin')
        .config(Config);
            
    Config.$inject = ['$stateProvider'];
    
    function Config($stateProvider) {
        $stateProvider
            .state('adminProduct', {
                url: '/adminProduct',
                controller: 'AdminProductController',
                controllerAs: 'vm',
                templateUrl: 'components/admin/admin-product.html'
            })
            .state('newProduct', {
                url: '/newProduct',
                controller: 'AdminAddUpdateProductController',
                controllerAs: 'vm',
                templateUrl: 'components/admin/admin-add-update-product.html',
                resolve: {
                    Product: function () { return {}; }
                }
            })
            .state('editProduct', {
                url: '/editProduct/{productId}',
                controller: 'AdminAddUpdateProductController',
                controllerAs: 'vm',
                templateUrl: 'components/admin/admin-add-update-product.html',
                resolve: {
                    Product: Product
                }
            });
    }
    
    Product.$inject = ['ProductService', '$stateParams'];
        
    function Product(ProductService, $stateParams) {
        return ProductService.get({ productId: $stateParams.productId });
    }
}());