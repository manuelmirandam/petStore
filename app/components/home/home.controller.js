(function () {
    'use strict';

    angular
        .module('petStore.controllers', [])
        .controller('HomeController', HomeController);
    
    HomeController.$inject = ['CategoryService', 'AnimalService', '$location'];
    
    function HomeController(CategoryService, AnimalService, $location) {
        var vm = this;
        vm.categories = CategoryService.getAll();
        vm.animals = AnimalService.getAll();
        vm.search = search;
            
        function search() {
            $location.path('/productList/search/' + vm.searchText);
        }
    }
}());