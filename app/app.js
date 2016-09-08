(function () {
    'use strict';
    
    angular
        .module('petStore', [
            'firebase',
            'blockUI',
            'ui.router',
            'petStore.controllers',
            'petStore.directives',
            'petStore.services',
            'petStore.filters'
        ])
        .config(Config)
        .run(Run);
    
    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Run.$inject = ['$rootScope', 'blockUI', '$state'];
    
    function Config($stateProvider, $urlRouterProvider) {
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
            })
            .state('productDetail', {
                url: '/productDetail/{productId}',
                controller: 'ProductDetailController',
                controllerAs: 'vm',
                templateUrl: 'components/productDetail/product-detail.html'
            })
            .state('shoppingCart', {
                url: '/shoppingCart',
                controller: 'ShoppingCartController',
                controllerAs: 'vm',
                templateUrl: 'components/shoppingCart/shopping-cart.html'
            })
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
                    Product: function (ProductService, $stateParams) {
                        return ProductService.getById($stateParams.productId);
                    }
                }
            })
            .state('error', {
                url: '/error/:status',
                controller: 'ErrorController',
                controllerAs: 'vm',
                templateUrl: 'shared/errors/error.html'
            });
            
        $urlRouterProvider.otherwise('/error/404');
    }
    
    function Run($rootScope, blockUI, $state) {
        $rootScope.$on('$stateChangeStart', function () {
            blockUI.start();
        });
        
        $rootScope.$on('$stateChangeSuccess', function () {
            blockUI.stop();
        });
        
        $rootScope.$on('$stateChangeError', function () {
            blockUI.stop();
            $state.go('error', { status: '500' });
        });
    }
}());