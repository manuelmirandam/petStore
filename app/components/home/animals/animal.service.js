(function () {
    'use strict';

    angular
        .module('petStore.home.services', [])
        .factory('AnimalService', AnimalService);

    AnimalService.$inject = ['constants', '$resource'];

    function AnimalService(constants, $resource) {
        return $resource(constants.API_URL + 'animals', null, {
            'update': {
                method: 'PUT'
            }
        });

    }
}());
