(function() {
    angular.module("utils", []);

    function mainCtrl($rootScope, $scope, version, $translate) {
        var vm = this;
        console.log(version);
        vm.navItems = ["Home", "Profile", "XYZ"];
        vm.handleSideNavClick = function() {
            console.log(vm.navItems);
            console.log(vm.parentHeading);
        };
        vm.parentHeading = "Awesome";
        setTimeout(function() {
            vm.parentHeading = "Hey I changed";
            $scope.$apply();
        }, 5000);


        vm.headerTemplate = 'app/utils/navbar.tpl.html';
        $rootScope.$on("ITEM-ADDED", function(evt, args) {
            vm.cartItemsCount++;
        });
        vm.cartItemsCount = 0;
        vm.changeLanguage = function(key) {
            $translate.use(key);
        };

    }

    function utilityService($http, $q) {
        this.validationPatterns = {
            email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        };
        this.getCountries = function() {
            return [{ name: "India", code: "IN" },
                { name: "United States", code: "USA" }
            ];
        };

        function dataMapper(response) {
            response.data.countries.forEach(function(element, index) {
                element.id = index;
            });
            return response;
        }
        this.getCountriesAsync = function() {
            //step 1 
            var dfd = $q.defer();
            // var response = {

            //     data: {
            //         countries: [{ name: "India", code: "IN" },
            //             { name: "United States", code: "USA" }
            //         ]
            //     }

            // };
            // dfd.resolve(response);
            var getData = localStorage.getItem("countries");
            if (getData) {
                dfd.resolve(JSON.parse(getData));
            } else {
                $http.get("api/countries.json")
                    .then(function(response) {
                        localStorage.setItem("countries", JSON.stringify(response));
                        var result = dataMapper(response);
                        dfd.resolve(response);
                    })
                    .catch(function(errorResponse) {
                        dfd.reject(errorResponse);
                    })
            }
            return dfd.promise;
        };


    }
    angular.module("utils")
        .service("utilityService", ["$http", "$q",
            utilityService
        ])
        .controller("mainCtrl", ["$rootScope", "$scope", "version", "$translate", mainCtrl]);
})();