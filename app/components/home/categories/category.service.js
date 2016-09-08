(function () {
    'use strict';
        
    angular
        .module('petStore.services', [])
        .factory('CategoryService', CategoryService);
         
    CategoryService.$inject = ['constants', '$firebaseArray'];
                                     
    function CategoryService(constants, $firebaseArray) {
        var categoryRef = new Firebase(constants.FIREBASE_URL + 'categories');
        var categoryService = {
            getAll: getAll
        };
         
        return categoryService;
        
        function getAll() {
            return $firebaseArray(categoryRef);
        }
    }
}());