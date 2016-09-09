(function () {
    'use strict';
    
    angular
        .module('petStore.productList')
        .config(Config);
            
    Config.$inject = ['$stateProvider'];
    
    function Config($stateProvider) {
        $stateProvider
            .state('/', {
                url: '/',
                controller: 'ProductListController',
                controllerAs: 'vm',
                templateUrl: 'components/productList/product-list.html'
            })
            .state('index', {
                url: '/index',
                controller: 'ProductListController',
                controllerAs: 'vm',
                templateUrl: 'components/productList/product-list.html'
            })
            .state('productList', {
                url: '/productList/{filterLbl}/{filterVal}',
                controller: 'ProductListController',
                controllerAs: 'vm',
                templateUrl: 'components/productList/product-list.html'
            });
    }
}());