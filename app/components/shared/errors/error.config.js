(function () {
    'use strict';
    
    angular
        .module('petStore.error')
        .config(Config);
            
    Config.$inject = ['$stateProvider'];
    
    function Config($stateProvider) {
        $stateProvider
            .state('error', {
                url: '/error/:status',
                controller: 'ErrorController',
                controllerAs: 'vm',
                templateUrl: 'components/shared/errors/error.html'
            });
    }
}());