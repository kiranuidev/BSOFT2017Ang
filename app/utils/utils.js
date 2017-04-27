(function() {
    angular.module("utils", []);


    function utilityService() {
        this.validationPatterns = {
            email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        };
        this.getCountries = function() {
            return [{ name: "India", code: "IN" },
                { name: "United States", code: "USA" }
            ];
        };
    }
    angular.module("utils")
        .service("utilityService", [utilityService]);
})();