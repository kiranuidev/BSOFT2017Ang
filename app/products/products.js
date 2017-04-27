(function() {
    angular.module("products", [])
        .service("productSvc", ["$http", "$q", productSvc])
        .controller("productCtrl", ["productSvc", productCtrl]);

    function productSvc($http, $q) {
        this.getProducts = function() {
            var dfd = $q.defer();
            $http.get("api/products.json")
                .then(function(response) {
                    dfd.resolve(response);
                })
                .catch(function(errorResponse) {
                    dfd.reject(errorResponse);
                });
            return dfd.promise;
        };
    }

    function productCtrl(productSvc) {
        var vm = this;
        productSvc.getProducts()
            .then(function(response) {
                vm.products = response.data.products;
            })
            .catch(function(errorResponse) {
                console.log(errorResponse);
            });
    }
})();