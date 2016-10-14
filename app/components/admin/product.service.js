(function () {
    'use strict';

    angular
        .module('petStore.admin.services', [])
        .factory('ProductService', ProductService);

    ProductService.$inject = ['constants', '$resource'];

    function ProductService(constants, $resource) {
        return $resource(constants.API_URL + 'products/:productId', {
            productId: '@_id'
        }, {
            'update': {
                method: 'PUT'
            },
            'patch': {
                method: 'PATCH'
            }
        });      
    }
}());
