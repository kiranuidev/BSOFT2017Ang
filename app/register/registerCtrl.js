(function() {
    function registerCtrl(utilitySvc) {
        var vm = this;
        vm.pageTitle = "Register";
        vm.user = {};
        vm.registerUser = function() {
            vm.isSubmitted = true;
            console.log(vm.user);
        };
        // vm.countries = utilitySvc.getCountries();
        vm.patterns = utilitySvc.validationPatterns;
        utilitySvc.getCountriesAsync()
            .then(function(response) {
                console.log(response);
                vm.countries = response.data.countries;
            })
            .catch(function(errorResponse) {
                console.log(errorResponse);
            }).finally(function() {
                console.log("Do what ever you wish");
            })
    }
    angular.module("register")
        .controller("registerCtrl", ["utilityService", registerCtrl]);
})();