(function () {
    'use strict';
        
    angular
        .module('petStore.services', [])
        .factory('CategoryService', CategoryService);
         
    CategoryService.$inject = ['firebaseUrl', '$firebaseArray'];
                                     
    function CategoryService(firebaseUrl, $firebaseArray) {
        var categoryRef = new Firebase(firebaseUrl + 'categories');
        var categoryService = {
            getAll: getAll
        };
                
        function getAll() {
            return $firebaseArray(categoryRef);
        }

        return categoryService;
    }
}());