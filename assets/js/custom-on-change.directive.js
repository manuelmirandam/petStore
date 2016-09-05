(function () {
    'use strict';
    
    angular.module('petStore.directives', [])
        .directive('customOnChange', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var onChangeFunc = scope.$eval(attrs.customOnChange);
                    element.bind('change', onChangeFunc);
                }
            };
        });
}());