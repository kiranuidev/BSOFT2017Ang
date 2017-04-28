(function() {
    //creating a module.
    angular.module("fashionbay", ["register",
        "utils", "products", "ui.router", 'pascalprecht.translate'
    ]);

    function config($stateProvider, $urlRouterProvider,
        $locationProvider, $translateProvider, versionProvider) {
        console.log(versionProvider.$get());
        versionProvider.setVersion("2.0.0");
        $urlRouterProvider.otherwise("/home");
        //$locationProvider.html5Mode(true);
        //defining the states.
        var registerObj = {
            name: "register",
            url: "/register",
            templateUrl: "app/register/register.tpl.html"
        };
        $stateProvider.state("register", registerObj);
        //map object to the state.

        var homeObj = {
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
        //locaalizaiton
        var english = {
            "Home": "Home",
            "Register": "Register",
            "Products": "Products",
            "Cart": "Cart"
        };
        var deutsch = {
            "Home": "Zuhause",
            "Register": "Neu registrieren",
            "Products": "Produkte",
            "Cart": "Karte"
        };

        $translateProvider.translations('en', english);
        $translateProvider.translations('de', deutsch);
        $translateProvider.preferredLanguage('de');

    }

    function version() {
        var appVersion = "1.0.0";
        this.setVersion = function(data) {
            appVersion = data;
        }
        this.$get = function() {
            return appVersion;
        }
    }
    angular.module("fashionbay")
        .provider("version", [version]);

    angular.module("fashionbay")
        .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$translateProvider", "versionProvider", config]);




})();