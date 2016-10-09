describe('Unit testing HomeController', function () {
    var $controller,
        $q,
        $scope = {},        
        vm,
        CategoryService,
        categories = [
            {
                $id: '1',
                name: 'Apparel'
            },
            {
                $id: '2',
                name: 'Toys'
            }
        ];

    beforeEach(module('petStore'));

    beforeEach(inject(function (_$controller_, _$q_, _CategoryService_) {
        $controller = _$controller_;
        $q = _$q_;
        CategoryService = _CategoryService_;

        vm = $controller('HomeController as vm', {
            $scope: $scope,
            CategoryService: CategoryService
        });
    }));

    it('should define the HomeController and its elements', function () {
        expect($scope.vm).toBe(vm);
        expect(vm.categories).toBeDefined();
        expect(vm.animals).toBeDefined();
        expect(vm.search).toBeDefined();
    });

    it('should load all categories', function () {
        var deferred = $q.defer();
        deferred.resolve(categories);                
        spyOn(CategoryService, 'getAll').and.returnValue(deferred.promise);
                        
        vm.categories = CategoryService.getAll();
        $scope.$digest();
        console.log(angular.mock.dump(vm.categories));
                        
        //expect(vm.categories[0].name).toEqual('Apparel');
        expect(CategoryService.getAll).toHaveBeenCalled();
    });

    it('should load all animals', function () {

    });

    it('should go to product list page when searching', function () {

    });
});
