(function () {
    'use strict';
    
    angular
        .module('petStore.home.services')
        .factory('AnimalService', AnimalService);
    
    AnimalService.$inject = ['constants', '$firebaseArray'];
    
    function AnimalService(constants, $firebaseArray) {
        var animalRef = new Firebase(constants.FIREBASE_URL + 'animals');
        var animalService = {
            getAll: getAll
        };
        
        return animalService;
        
        function getAll() {
            return $firebaseArray(animalRef);
        }
    }
}());