(function() {
    //creating a module.
    angular.module("fashionbay", ["register",
        "utils", "products", "ui.router"
    ]);

    function config($stateProvider) {
        //defining the states.
        var registerObj = {
            name: "register",
            templateUrl: "app/register/register.tpl.html"
        };
        $stateProvider.state("register", registerObj);
        //map object to the state.

        var homeObj = {
            name: "home",
            templateUrl: "app/home/home.tpl.html"
        };
        $stateProvider.state("home", homeObj);
        //map object to the state.



        var productsObj = {
            name: "products",
            templateUrl: "app/products/products.tpl.html",
            controller: "productCtrl as pc"
        };
        $stateProvider.state("products", productsObj);
        //map object to the state.
    }
    angular.module("fashionbay")
        .config(["$stateProvider", config]);

})();