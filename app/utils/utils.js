(function() {
    angular.module("utils", []);

    function mainCtrl() {
        var vm = this;
        vm.headerTemplate = 'app/utils/navbar.tpl.html';
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
        .controller("mainCtrl", [mainCtrl]);
})();