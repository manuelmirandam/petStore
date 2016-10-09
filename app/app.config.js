(function () {
    'use strict';

    angular
        .module('petStore')
        .run(Run);

    Run.$inject = ['$rootScope', 'blockUI', '$state'];

    function Run($rootScope, blockUI, $state) {
        $rootScope.$on('$stateChangeStart', function () {
            blockUI.start();
        });

        $rootScope.$on('$stateChangeSuccess', function () {});

        $rootScope.$on('$stateChangeError', function (error) {
            blockUI.stop();
            $state.go('error', {
                status: '500'
            });
        });
    }
}());
