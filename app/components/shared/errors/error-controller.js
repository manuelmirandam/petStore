(function () {
    'use strict';
    
    angular
        .module('petStore.error.controllers', [])
        .controller('ErrorController', ErrorController);
    
    ErrorController.$inject = ['$stateParams', 'constants'];
    
    function ErrorController($stateParams, constants) {
        var vm = this;
                        
        // Let's validate the error status and display the appropiate message
        switch ($stateParams.status) {
        case '404':
            vm.title = constants.ERROR_404_TITLE;
            vm.description = constants.ERROR_404_DESCRIPTION;
            break;
        case '500':
            vm.title = constants.ERROR_500_TITLE;
            vm.description = constants.ERROR_500_DESCRIPTION;
            break;
        }
    }
}());