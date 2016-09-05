(function () {
    'use strict';
    
    angular
        .module('petStore', [
            'ngRoute',
            'firebase',
            'petStore.controllers',
            'petStore.directives',
            'petStore.services',
            'petStore.filters'
        ])
        .config(Config)
        .constant('firebaseUrl', 'https://petstore-f6220.firebaseio.com/');
    
    Config.$inject = ['$routeProvider'];
    
    function Config($routeProvider) {        
        $routeProvider
            .when('/', {
                controller: 'ProductListController',
                controllerAs: 'vm',
                templateUrl: 'components/productList/product-list.html'
            })
            .when('/index', {
                controller: 'ProductListController',
                controllerAs: 'vm',
                templateUrl: 'components/productList/product-list.html'
            })
            .when('/productList/:filterLbl/:filterVal', {
                controller: 'ProductListController',
                controllerAs: 'vm',
                templateUrl: 'components/productList/product-list.html'
            })
            .when('/productDetail/:productId', {
                controller: 'ProductDetailController',
                controllerAs: 'vm',
                templateUrl: 'components/productDetail/product-detail.html'
            })
            .when('/shoppingCart', {
                controller: 'ShoppingCartController',
                controllerAs: 'vm',
                templateUrl: 'components/shoppingCart/shopping-cart.html'
            })
            .when('/adminProduct', {
                controller: 'AdminProductController',
                controllerAs: 'vm',
                templateUrl: 'components/admin/admin-product.html'
            })
            .when('/newProduct', {
                controller: 'AdminAddUpdateProductController',
                controllerAs: 'vm',
                templateUrl: 'components/admin/admin-add-update-product.html',
                resolve: {
                    Product: function () { return {}; }
                }
            })
            .when('/editProduct/:productId', {
                controller: 'AdminAddUpdateProductController',
                controllerAs: 'vm',
                templateUrl: 'components/admin/admin-add-update-product.html',
                resolve: {
                    Product: function (ProductService, $route) {
                        return ProductService.getById($route.current.params.productId);
                    }
                }
            })
            .otherwise('/index');
    }
}());