(function() {
    //creating a module.
    angular.module("fashionbay", ["register",
        "utils", "products", "ui.router"
    ]);

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/home");
        $locationProvider.html5Mode(true);
        //defining the states.
        var registerObj = {
            name: "register",
            url: "/register",
            templateUrl: "app/register/register.tpl.html"
        };
        $stateProvider.state("register", registerObj);
        //map object to the state.

        var homeObj = {
            name: "home",
            url: "/home",
            templateUrl: "app/home/home.tpl.html"
        };
        $stateProvider.state("home", homeObj);
        //map object to the state.



        var productsObj = {
            name: "products",
            url: "/products",
            templateUrl: "app/products/products.tpl.html",
            controller: "productCtrl as pc"
        };
        $stateProvider.state("products", productsObj);
        //map object to the state.
        var cartObj = {
            name: "cart",
            url: "/cart",
            templateUrl: "app/products/cart.tpl.html",
            controller: "productCtrl as pc"
        };
        $stateProvider.state("cart", cartObj);
    }
    angular.module("fashionbay")
        .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", config]);

})();