(function () {
    'use strict';
    
    angular.module('petStore')
        .constant('constants', {
            FIREBASE_URL: 'https://petstore-f6220.firebaseio.com/',
            IN_STOCK: 'In stock',
            SOLD_OUT: 'Sold out',
            LOAD_MORE: 'Load more',
            NO_MORE_PRODUCTS: 'No more products',
            LOAD_MORE_ICON: 'fa fa-plus',
            ERROR_404_TITLE: 'Page not found',
            ERROR_404_DESCRIPTION: 'We are sorry. The page that you requested cannot be found',
            ERROR_500_TITLE: 'Server error',
            ERROR_500_DESCRIPTION: 'We are sorry. The server encountered an internal error and was unable to complete your request. Please try again later'
        });
}());