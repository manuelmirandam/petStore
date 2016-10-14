(function () {
    'use strict';

    angular
        .module('petStore.home.controllers', [])
        .controller('HomeController', HomeController);

    HomeController.$inject = ['CategoryService', 'AnimalService', '$state'];

    function HomeController(CategoryService, AnimalService, $state) {
        var vm = this;
        vm.categories = CategoryService.query();
        vm.animals = AnimalService.query();
        vm.search = search;

        /*
         * Method to search a product by a given search filter criteria
         */
        function search() {
            $state.go('productList', {
                filterLbl: 'search',
                filterVal: vm.searchText
            });
        }
    }
}());
