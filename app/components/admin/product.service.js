(function () {
    'use strict';
    
    angular
        .module('petStore.services')
        .factory('ProductService', ProductService);
    
    ProductService.$inject = ['$firebaseObject', '$firebaseArray', 'firebaseUrl', '$timeout'];
    
    function ProductService($firebaseObject, $firebaseArray, firebaseUrl, $timeout) {
        var productRef = new Firebase(firebaseUrl + 'products');
        
        var productService = {
            getAll: getAll,
            getById: getById,
            save: save,
            update: update,
            deleteProduct: deleteProduct
        };
        
        return productService;

        /*
         * Method to get all products from db
         */
        function getAll() {
            return $firebaseArray(productRef);
        }

        /*
         * Method to get a product by id
         */
        function getById(productId) {
            return $firebaseObject(productRef.child(productId));
        }

        /*
         * Method to save a product
         */
        function save(product) {
            productRef.push(product);
        }

        /*
         * Method to update a product
         */
        function update(product) {
            productRef.child(product.$id)
                .update({
                    name: product.name,
                    shortDescription: product.shortDescription,
                    largeDescription: product.largeDescription,
                    imgPath: product.imgPath,
                    stock: product.stock,
                    unitPrice: product.unitPrice,
                    animalId: product.animalId,
                    categoryId: product.categoryId
                });
        }

        /*
         * Method to delete a product
         */
        function deleteProduct(product) {
            return $firebaseObject(productRef.child(product.$id)).$remove();
        }
    }
}());