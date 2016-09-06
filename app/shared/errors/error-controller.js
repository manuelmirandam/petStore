(function () {
    'use strict';
    
    angular
        .module('petStore.controllers')
        .controller('ErrorController', ErrorController);
    
    ErrorController.$inject = ['$routeParams'];
    
    function ErrorController($routeParams) {
        var vm = this;
                        
        // Let's validate the error status and display the appropiate message
        switch ($routeParams.status) {
        case '404':
            vm.title = "Page not found";
            vm.description = "We're sorry. The page that you requested cannot be found";
            break;
        case '500':
            vm.title = "Server error";
            vm.description = "We're sorry. The server encountered an internal error and was unable to complete your request. Please try again later";
            break;
        }
    }
}());