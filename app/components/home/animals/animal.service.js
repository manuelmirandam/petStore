(function () {
    'use strict';
    
    angular
        .module('petStore.services')
        .factory('AnimalService', AnimalService);
    
    AnimalService.$inject = ['firebaseUrl', '$firebaseArray'];
    
    function AnimalService(firebaseUrl, $firebaseArray) {
        var animalRef = new Firebase(firebaseUrl + 'animals');
        var animalService = {
            getAll: getAll
        };
        
        return animalService;
        
        function getAll() {
            return $firebaseArray(animalRef);
        }                
    }
}());