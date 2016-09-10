(function () {
    'use strict';

    angular
        .module('petStore', [
            'firebase',
            'blockUI',
            'ui.router',
            'petStore.admin',
            'petStore.home',
            'petStore.productDetail',
            'petStore.productList',
            'petStore.shoppingCart',
            'petStore.error'
        ])
        .config(Config);

    Config.$inject = ['$urlRouterProvider'];

    function Config($urlRouterProvider) {
        $urlRouterProvider.otherwise('/error/404');
    }
}());