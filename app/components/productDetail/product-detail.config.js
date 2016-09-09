(function () {
    'use strict';
    
    angular
        .module('petStore.productDetail')
        .config(Config);
            
    Config.$inject = ['$stateProvider'];
    
    function Config($stateProvider) {
        $stateProvider
            .state('productDetail', {
                url: '/productDetail/{productId}',
                controller: 'ProductDetailController',
                controllerAs: 'vm',
                templateUrl: 'components/productDetail/product-detail.html'
            });
    }
}());