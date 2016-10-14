(function () {
    'use strict';

    angular
        .module('petStore.home.services')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = ['constants', '$resource'];

    function CategoryService(constants, $resource) {
        return $resource(constants.API_URL + 'categories', null, {
            'update': {
                method: 'PUT'
            }
        });
    }
}());
