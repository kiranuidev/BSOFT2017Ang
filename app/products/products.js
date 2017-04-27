(function() {
    angular.module("products", [])
        .service("productSvc", ["$http", "$q", productSvc])
        .controller("productCtrl", ["$rootScope", "productSvc", productCtrl]);

    function productSvc($http, $q) {
        var cartItems = [];

        this.addToCart = function(item) {
            cartItems.push(item);
        };
        this.getCartItems = function() {
            return cartItems;
        };
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

        function datamapper(res) {
            var response = {
                data: {
                    products: []
                }
            }
            angular.forEach(res.data.items, function(item, index) {
                var product = {
                    index: index,
                    Model: item.name,
                    Price: item.salePrice,
                    Description: item.shortDescription
                }
                response.data.products.push(product);
            });
            return response;
        };
        this.getProductsFromWM = function(search) {
            //var url = "WM/&query=" + search;
            var url = "WM/" + search;
            var dfd = $q.defer();
            $http.get(url)
                .then(function(response) {
                    var result = datamapper(response);
                    dfd.resolve(result);
                })
                .catch(function(errorResponse) {
                    dfd.reject(errorResponse);
                });
            return dfd.promise;
        };
    }

    function productCtrl($rootScope, productSvc) {
        var vm = this;
        vm.sort = {
            model: "Model"
        };
        vm.orderByModel = function() {
            vm.sort.model = vm.sort.model == "Model" ? "-Model" : "Model";
        };

        vm.searchProducts = function() {
            productSvc.getProductsFromWM(vm.search)
                .then(function(response) {
                    vm.products = response.data.products;
                    console.log(response);
                })
                .catch(function(response) {
                    console.log(response);
                });

        };

        vm.selectProduct = function(item) {
            productSvc.addToCart(item);
            $rootScope.$broadcast("ITEM-ADDED");
        };


        function init() {
            vm.CartProducts = productSvc.getCartItems();
        }


        init();

    }
})();